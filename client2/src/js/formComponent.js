import {
  selectRegion,
  selectCountry,
  printCountries,
  selectCity
} from './locationSelector';
import { updateStore } from '../index';
import { getDateString } from './helperFunctions';
import { countriesData } from './locationSelector/countriesData';

import { getTrips, createTrip } from './api/trips-api';

const formComponent = (selectedRegion, selectedCountry, selectedCity, note) => {
  const d = new Date();
  const currentDate = getDateString(d.getTime());

  const dFuture = new Date();
  dFuture.setDate(d.getDate() + 15);
  const futureDate = getDateString(dFuture.getTime());

  return `
  <section id="usrform">
    <form>
      <div id="travel-location">
        
        <div id="location">
          <label for="location">Traveling to:</label>
          <select required id="region" name="region">
          <option value="" >SELECT REGION</option>
          ${selectRegion(selectedRegion).join(' ')}
          </select>
          ${
            selectedRegion
              ? `<select required id="country" name="country">
          <option value="" >SELECT COUNTRY</option>
          ${printCountries(selectedCountry).join(' ')}
          </select>`
              : ''
          }
          ${
            selectedCountry &&
            selectedRegion &&
            selectedCity !== selectedCountry
              ? `<input required id="city" name="city" value="${
                  selectedCity ? selectedCity : ''
                }" placeholder="Enter city name">`
              : ''
          }
        </div>
      </div>
      <div id="travel-date">
        <label for="date">Traveling date:</label>
        <input required min="${currentDate}" max="${futureDate}" type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button id="submit-button" type="button" ${
          selectedCountry && selectedRegion && selectedCity ? '' : 'disabled'
        } >Submit</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

const handleForm = async (selectedRegion, selectedCountry, selectedCity) => {
  try {
    const date = document.getElementById('date');
    const selectedDate = date.valueAsNumber;

    const countryInfo = countriesData.counrties.find(
      (country) => country.name === selectedCountry
    );

    // countriesData.selectedCountryInfo = countryInfo[0];

    if (!selectedDate) {
      updateStore({
        note: 'Please select a date!'
      });
      return;
    }

    updateStore({
      mainNote: 'Updating...',
      note: 'Getting information...'
    });

    const newTrip = {
      region: selectedRegion,
      country: selectedCountry,
      city: selectedCity,
      date: selectedDate,
      countryInfo: countryInfo
    };

    const response = await createTrip();

    const res = await fetch('http://localhost:8081/post-data', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        region: selectedRegion,
        country: selectedCountry,
        city: selectedCity,
        date: selectedDate,
        countryInfo: countryInfo
      })
    });

    if (res.status == 500) throw await res.json();

    await updateUI();
  } catch (e) {
    switch (e.matchErr) {
      case 'COUNTRY MATCHING ERROR':
        updateStore({
          mainNote:
            "Looks like the country you select doesn't match with the city you typed.",
          note: 'No result'
        });
        return;
      case 'CITY NAME ERROR':
        updateStore({
          mainNote: 'Please make sure you have typed the correct city name.',
          note: 'No result'
        });
        return;
      default:
        updateStore({
          mainNote: `Sorry, couldn't get your information, ${e.message}, please try again!`,
          note: 'No result'
        });
    }
  }
};

const updateUI = async () => {
  try {
    const res = await fetch('http://localhost:8081/get-data');
    const data = await res.json();

    updateStore({
      tripsInfo: data.data.reverse(),
      note: '',
      mainNote:
        'Your trip has been added, you can now add another trip to your list.'
    });
  } catch (e) {
    return `cannot get data: ${e.message}`;
  }
};

export { formComponent, selectCountry, selectCity, handleForm };
