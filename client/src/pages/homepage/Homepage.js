import React, { useState, useEffect, useContext, Fragment } from 'react';
import './Homepage.styles.scss';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { getTrips } from '../../api/tripsAPI';
import Form from '../../components/form/Form';
import Trips from '../../components/trips/Trips';

const Homepage = ({
  auth,
  trips,
  setTrips,
  history,
  mainNote,
  setMainNote
}) => {
  // const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState(false);
  console.log(auth);
  // console.log(history);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      const getTripsData = async () => {
        const tripsData = await getTrips(auth.getIdToken());
        setTrips(tripsData);
        console.log(tripsData);
      };
      getTripsData();
    }
  }, [auth, newTrip, setTrips]);

  if (!auth.isAuthenticated()) {
    return <h3>Please login</h3>;
  }

  return (
    <Fragment>
      <Form setMainNote={setMainNote} auth={auth} setNewTrip={setNewTrip} />
      <Trips
        trips={trips}
        setMainNote={setMainNote}
        history={history}
        auth={auth}
        setNewTrip={setNewTrip}
      />
    </Fragment>
  );
};

export default Homepage;
