import './App.scss';
import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
import Note from './components/note/Note';
import Homepage from './pages/homepage/Homepage';
import NavBar from './components/nav-bar/NavBar';
import Footer from './components/footer/Footer';
import UploadImagePage from './pages/upload-image-page/UploadImagePage';

function App(props) {
  console.log('auth value', props);
  const [trips, setTrips] = useState([]);
  const [mainNote, setMainNote] = useState('');
  return (
    <div className="container">
      <NavBar auth={props.auth} />
      <main>
        <Note mainNote={mainNote} setMainNote={setMainNote} />
        <Switch>
          <Route path="/" exact>
            <Homepage
              auth={props.auth}
              trips={trips}
              setTrips={setTrips}
              history={props.history}
              mainNote={mainNote}
              setMainNote={setMainNote}
            />
          </Route>

          <Route path="/trips/:tripId/edit" exact>
            <UploadImagePage
              auth={props.auth}
              trips={trips}
              setTrips={setTrips}
              location={props.location}
              setMainNote={setMainNote}
            />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
