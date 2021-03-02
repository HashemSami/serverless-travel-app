import { countriesData } from './countriesData';
import { updateStore } from '../../index';

// loop through the regions
export const selectRegion = (selectedRegion) => {
  const optionsArray = countriesData.regions.map((region) => {
    return `<option value="${region}" ${
      selectedRegion === region ? 'selected' : ''
    }>${region}</option>`;
  });
  return optionsArray;
};

// fetching countries data to create a dropdown
export const selectCountry = async (regions) => {
  try {
    const selectedRegion = regions.value;

    if (!selectedRegion) {
      updateStore({
        selectedRegion: null,
        selectedCountry: null,
        selectedCity: null
      });
      return false;
    }

    updateStore({
      note: 'getting countries data..'
    });

    const res = await fetch(
      `https://restcountries.eu/rest/v2/region/${selectedRegion}`
    );

    const data = await res.json();
    // console.log(data);

    countriesData.counrties = data;

    updateStore({
      selectedRegion: selectedRegion,
      selectedCountry: null,
      selectedCity: null,
      note: ''
    });
  } catch (e) {
    updateStore({
      mainNote: "Couldn't collect countries data, please try again"
    });
  }
};

export const printCountries = (selectedCountry) => {
  const optionsArray = countriesData.counrties.map((country) => {
    const { name } = country;
    return `<option value="${name}" ${
      selectedCountry === name ? 'selected' : ''
    }>${name}</option>`;
  });
  return optionsArray;
};

// open city input
export const selectCity = (countries) => {
  const selectedCountry = countries.value;

  if (!selectedCountry) {
    updateStore({
      selectedCountry: null,
      selectedCity: null
    });
    return false;
  }

  updateStore({
    selectedCountry: selectedCountry
  });
};

export const setCity = (city) => {
  const selectedCity = city.value;
  if (!selectedCity) {
    updateStore({
      selectedCity: null
    });
    return false;
  }
  updateStore({
    selectedCity: selectedCity
  });
};
