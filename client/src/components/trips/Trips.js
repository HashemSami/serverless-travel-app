import React, { Fragment } from 'react';
import './Trips.styles.scss';

import TripCard from './trips-components/TripCard';

const Trips = ({ trips, setMainNote, history, auth }) => {
  if (!trips || !trips.length) {
    setMainNote('Please fill the form to add your trips');
    return '';
  }

  setMainNote('Your trips list ✌, fill the form to add more.');

  const handleUpdateImage = (tripId, userId) => {
    console.log(tripId);
    setMainNote('Please upload you image here.');
    history.push({
      pathname: `/trips/${tripId}/edit`,
      state: { tripId, userId }
    });
  };

  const handleDeleteCard = (tripId, userId) => {
    console.log(userId);
    console.log(tripId);
  };

  console.log('trips', trips);
  return (
    <section id="result">
      <TripCard
        trips={trips}
        handleUpdateImage={handleUpdateImage}
        handleDeleteCard={handleDeleteCard}
        setMainNote={setMainNote}
        auth={auth}
      />
    </section>
  );
};

export default Trips;
