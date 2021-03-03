import React, { useState, useEffect, Fragment } from 'react';
import './Homepage.styles.scss';
import { getTrips } from '../../api/tripsAPI';
import Note from '../../components/note/Note';
import Form from '../../components/form/Form';
import Trips from '../../components/trips/Trips';

const Homepage = ({ auth, trips, setTrips, history }) => {
  // const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState(false);
  const [mainNote, setMainNote] = useState('');
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
      <main>
        <Note mainNote={mainNote} setMainNote={setMainNote} />
        <Form setMainNote={setMainNote} auth={auth} setNewTrip={setNewTrip} />
        <Trips
          trips={trips}
          setMainNote={setMainNote}
          history={history}
          auth={auth}
          setNewTrip={setNewTrip}
        />
      </main>
    </Fragment>
  );
};

export default Homepage;
