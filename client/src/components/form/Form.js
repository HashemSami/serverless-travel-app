import React, { useState } from 'react';
import './Form.styles.scss';
import RegionSelector from './form-components/RegionSelector';
import CountriesSelector from './form-components/CountriesSelector';
import CityInput from './form-components/CityInput';
import DateInput from './form-components/DateInput';

import { createTrip } from '../../api/tripsAPI';

const Form = ({ setMainNote, auth, setNewTrip }) => {
  const [regions, setRegions] = useState([
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]);
  const [countries, setCountries] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const countryInfo = countriesData.find(
        (country) => country.name === selectedCountry
      );

      const getDate = new Date(selectedDate);
      const travelDate = getDate.getTime();
      // console.log(travelDate);

      const newTrip = {
        region: selectedRegion,
        country: selectedCountry,
        city: selectedCity,
        travelDate,
        countryInfo
      };

      const idToken = auth.getIdToken();

      setMainNote('');

      setNote('Getting your trip data...');

      const newTripItem = await createTrip(idToken, newTrip);

      setNewTrip((t) => (t ? false : true));

      setMainNote('Done, you can now add another trip to your list.');

      setNote('');
    } catch (e) {
      // alert('Trip creation failed');
      setNote('No result!');
      // console.log(e.matchErr);
      switch (e.response.data.matchErr) {
        case 'COUNTRY MATCHING ERROR':
          setMainNote(
            "Looks like the country you select doesn't match with the city you typed."
          );
          return;
        case 'CITY NAME ERROR':
          setMainNote('Please make sure you have typed the correct city name.');
          return;
        default:
          setMainNote(
            `Sorry, couldn't get your information, ${e.message}, please try again!`
          );
      }
    }
  };

  return (
    <section id="usrform">
      <form onSubmit={(e) => handleForm(e)}>
        <div id="travel-location">
          <div id="location">
            <label htmlFor="location">Traveling to:</label>

            <RegionSelector
              regions={regions}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              setSelectedCountry={setSelectedCountry}
              setNote={setNote}
              setCountries={setCountries}
              setMainNote={setMainNote}
              setCountriesData={setCountriesData}
            />

            {selectedRegion ? (
              <CountriesSelector
                countries={countries}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
              />
            ) : (
              ''
            )}

            {selectedCountry &&
            selectedRegion &&
            selectedCity !== selectedCountry ? (
              <CityInput
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
            ) : (
              ''
            )}
          </div>
        </div>

        <div id="travel-date">
          <label htmlFor="date">Traveling date:</label>
          <DateInput
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <button
          id="submit-button"
          type="submit"
          disabled={
            selectedCountry && selectedRegion && selectedCity && selectedDate
              ? false
              : true
          }
        >
          Submit
        </button>
      </form>

      <div id="note">{note}</div>
    </section>
  );
};

export default Form;
