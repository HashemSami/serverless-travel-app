import React from 'react';

const RegionSelector = ({
  regions,
  selectedRegion,
  setSelectedRegion,
  setSelectedCountry,
  setNote,
  setCountries,
  setMainNote,
  setCountriesData
}) => {
  const optionsArray = regions.map((region) => {
    return (
      <option key={region} value={region}>
        {region}
      </option>
    );
  });

  const handleOnRegionChange = async (e) => {
    try {
      const { value } = e.target;
      if (!value) {
        setSelectedRegion(null);
        setSelectedCountry(null);
        // setSelectedCity((selectedCity) => (selectedCity = null));
        return false;
      }

      setSelectedRegion(value);

      setNote('getting countries data..');

      const res = await fetch(
        `https://restcountries.eu/rest/v2/region/${value}`
      );

      const data = await res.json();
      setCountriesData(data);

      const contriesNames = data.map((country) => country.name);

      setCountries(contriesNames);

      setNote('');
    } catch (e) {
      console.log(e.message);
      setMainNote("Couldn't collect countries data, please try again");
    }
  };

  return (
    <select
      onChange={async (e) => {
        await handleOnRegionChange(e);
      }}
      required
      id="region"
      name="region"
      defaultValue={selectedRegion}
    >
      <option value="">SELECT REGION</option>
      {optionsArray}
    </select>
  );
};

export default RegionSelector;
