import React from 'react';

const CityInput = ({ selectedCity, setSelectedCity }) => {
  // const [city, setCity] ={}

  const handleSelectedCity = (e) => {
    setSelectedCity(e.target.value);
    // console.log(selectedCity);
  };
  return (
    <input
      required
      id="city"
      name="city"
      value={selectedCity}
      placeholder="Enter city name"
      onChange={(e) => handleSelectedCity(e)}
    />
  );
};

export default CityInput;
