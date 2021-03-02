import { apiEndpoint } from '../../config';
import Axios from 'axios';


export const getTrips = async(idToken) =>{
    console.log("Fetching trips")

    const response = await Axios.get(`${apiEndpoint}/trips`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });

    console.log('Trips:', response.data)

    return response.data.items;
};

export const createTrip = async(idToken, newTrip) => {
    const response = await Axios.post(`${apiEndpoint}/trips`,  JSON.stringify(newTrip),{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      })

      return response.data.item;
};

export const deleteTrip = (idToken, tripId) => {
    await Axios.delete(`${apiEndpoint}/trips/${tripId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
    });
};