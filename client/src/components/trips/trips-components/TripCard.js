import React from 'react';

import TripButton from './TripButton';
import { calculateRemainingDays } from '../../../utils/helperFunctions';

import * as icons from '../../../icons';

const TripCard = ({
  trips,
  handleUpdateImage,
  handleDeleteCard,
  forImageUpdate = false
}) => {
  const printTrips = () => {
    return trips.map((trip, i) => {
      const {
        userId,
        tripId,
        country,
        city,
        countryInfo,
        longitude,
        latitude,
        travelDate,
        max_temp,
        min_temp,
        weather,
        imageURL
      } = trip;
      const remainingDays = calculateRemainingDays(travelDate);

      return (
        <div id="card" key={tripId}>
          <div id="photo">
            <img alt={`${city} ${i}`} src={imageURL} />
          </div>
          <div id="info">
            <div id="city-info-with-button">
              <div id="city-info">
                <p>Your trip To: </p>
                <p>
                  <span>{city}</span>
                </p>
                <p>Days Remaining:</p>
                <p>
                  <span>{remainingDays} day/s</span>
                </p>
              </div>

              {!forImageUpdate ? (
                <div id="card-buttons">
                  <TripButton
                    onClick={() => {
                      handleUpdateImage(tripId, userId);
                    }}
                    title="Change Image"
                    color="blue"
                  />
                  <TripButton
                    title="Delete Card"
                    color="red"
                    onClick={() => {
                      handleDeleteCard(tripId, userId);
                    }}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            <hr />
            <div id="country-info">
              <p id="subject">Country information:</p>
              <p id="country-name">
                Name: <span>{country}</span>
              </p>
              <img id="flag" alt="country flag" src={countryInfo.flag} />
              <p id="capital">
                Capital: <span>{countryInfo.capital}</span>
              </p>
              <p id="lang">
                Language: <span>{countryInfo.languages[0].name}</span>
              </p>
              <p id="curr">
                Currency: <span>{countryInfo.currencies[0].name}</span>
              </p>
            </div>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Longitude</th>
                  <th>Latitude</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>{longitude}</span>
                  </td>
                  <td>
                    <span>{latitude}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Max temp</th>
                  <th>Min temp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>{max_temp} &#8451;</span>
                  </td>
                  <td>
                    <span>{min_temp} &#8451;</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <p>Weather forecast:</p>
            <div id="wether-dis">
              <p>
                <span>{weather.description}</span>
              </p>
              <img alt="Weather Icon" src={icons[`${weather.icon}`]} />
            </div>
          </div>
        </div>
      );
    });
  };

  return printTrips();
};

export default TripCard;
