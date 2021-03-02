import React, { useState, useEffect, Fragment } from 'react';
import Auth from './auth/Auth';
import { Router, Route } from 'react-router-dom';
import * as browserHistory from 'history';
import App from './App';
import AuthedContext from './auth/AuthedContext';

const history = browserHistory.createBrowserHistory();

const auth = new Auth(history);

const handleAuthentication = (props) => {
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const MakeAuthRouting = (props) => {
  return (
    <Router history={history}>
      <div>
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props);
            return <h2>Loading</h2>;
          }}
        />
        <Route
          render={(props) => {
            return <App auth={auth} {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
