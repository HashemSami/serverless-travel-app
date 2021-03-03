import './App.scss';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import NavBar from './components/nav-bar/NavBar';
import Footer from './components/footer/Footer';
import UploadImagePage from './pages/upload-image-page/UploadImagePage';

function App(props) {
  console.log('auth value', props);
  const [trips, setTrips] = useState([]);

  return (
    <div className="container">
      <NavBar auth={props.auth} />

      <Switch>
        <Route path="/" exact>
          <Homepage
            auth={props.auth}
            trips={trips}
            setTrips={setTrips}
            history={props.history}
          />
        </Route>

        <Route path="/trips/:tripId/edit" exact>
          <UploadImagePage
            auth={props.auth}
            trips={trips}
            setTrips={setTrips}
            location={props.location}
          />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
