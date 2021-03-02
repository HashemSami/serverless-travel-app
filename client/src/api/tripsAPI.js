import { apiEndpoint } from '../config';
import Axios from 'axios';

export const getTrips = async (idToken) => {
  console.log('Fetching trips');
  try {
    const response = await Axios.get(`${apiEndpoint}/trips`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    });

    console.log('Trips:', response.data);

    return response.data.items;
  } catch (e) {
    alert(e.message);
  }
};

export const createTrip = async (idToken, newTrip) => {
  // console.log(newTrip);
  const response = await Axios.post(
    `${apiEndpoint}/trips`,
    JSON.stringify(newTrip),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  );
  console.log('response:', response.data);

  return await response.data.item;
};

export const deleteTrip = async (idToken, tripId) => {
  await Axios.delete(`${apiEndpoint}/trips/${tripId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  });
};

export const getUploadUrl = async (idToken, tripId) => {
  const response = await Axios.post(
    `${apiEndpoint}/trips/${tripId}/attachment`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  );

  return response.data.uploadUrl;
};

export const uploadFile = async (uploadUrl, file) => {
  await Axios.put(uploadUrl, file);
};
