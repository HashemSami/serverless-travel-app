import React, { Fragment, useState } from 'react';

const CountriesSelector = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  setSelectedCity
}) => {
  const optionsArray = countries.map((country) => {
    return (
      <option
        value={country}
        key={country}
        // selected={selectedCountry === country ? true : false}
      >
        {country}
      </option>
    );
  });

  const handleSelectCountry = (e) => {
    const { value } = e.target;
    setSelectedCountry(value);
    if (!value) {
      setSelectedCity('');
    }
    // console.log(selectedCountry);
  };

  return (
    <select
      onChange={(e) => {
        return handleSelectCountry(e);
      }}
      required
      id="country"
      name="country"
      defaultValue={selectedCountry}
    >
      <option value="">SELECT COUNTRY</option>
      {optionsArray}
    </select>
  );
};

export default CountriesSelector;
