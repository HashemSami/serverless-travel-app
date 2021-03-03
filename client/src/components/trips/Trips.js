import React from 'react';
import './Trips.styles.scss';
import { deleteTrip } from '../../api/tripsAPI';

import TripCard from './trips-components/TripCard';

const Trips = ({ trips, setMainNote, history, auth, setNewTrip }) => {
  if (!trips || !trips.length) {
    setMainNote('Please fill the form to add your trips');
    return '';
  }

  const handleUpdateImage = (tripId, userId) => {
    console.log(tripId);
    setMainNote('Please upload you image here.');
    history.push({
      pathname: `/trips/${tripId}/edit`,
      state: { tripId, userId }
    });
  };

  const handleDeleteCard = async (tripId, userId) => {
    try {
      await deleteTrip(auth.getIdToken(), tripId);
      setNewTrip((t) => (t ? false : true));
    } catch (e) {
      alert('delete failed,' + e.message);
    }
  };

  console.log('trips', trips);
  return (
    <section id="result">
      <TripCard
        trips={trips}
        handleUpdateImage={handleUpdateImage}
        handleDeleteCard={handleDeleteCard}
      />
    </section>
  );
};

export default Trips;
