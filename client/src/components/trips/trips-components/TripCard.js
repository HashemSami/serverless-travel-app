import React, { Fragment } from 'react';

import TripButton from './TripButton';
import ImageUpload from '../../image-upload/ImageUpload';
import { calculateRemainingDays } from '../../../utils/helperFunctions';

import * as icons from '../../../icons';

const TripCard = ({
  trips,
  handleUpdateImage,
  handleDeleteCard,
  setMainNote,
  auth,
  forImageUpdate = false
}) => {
  const printTrips = () => {
    return trips.map((trip) => {
      const {
        userId,
        tripId,
        region,
        country,
        city,
        countryInfo,
        longitude,
        latitude,
        travelDate,
        max_temp,
        min_temp,
        weather,
        imageURL,
        tags
      } = trip;
      const remainingDays = calculateRemainingDays(travelDate);

      return (
        <div id="card" key={tripId}>
          <div id="photo">
            {!forImageUpdate ? (
              <img alt={tags} src={imageURL} />
            ) : (
              <ImageUpload
                auth={auth}
                tripId={tripId}
                setMainNote={setMainNote}
              />
            )}
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
              <tr>
                <th>Longitude</th>
                <th>Latitude</th>
              </tr>
              <tr>
                <td>
                  <span>{longitude}</span>
                </td>
                <td>
                  <span>{latitude}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <th>Max temp</th>
                <th>Min temp</th>
              </tr>
              <tr>
                <td>
                  <span>{max_temp} &#8451;</span>
                </td>
                <td>
                  <span>{min_temp} &#8451;</span>
                </td>
              </tr>
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
