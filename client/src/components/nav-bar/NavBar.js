import React, { useContext } from 'react';
import './NavBar.styles.scss';
import { Link } from 'react-router-dom';

import AuthedContext from '../../auth/AuthedContext';

const NavBar = (props) => {
  console.log(props.auth.isAuthenticated());
  return (
    <div className="head">
      <Link className="logo-container" to="/">
        <h2>Travel App</h2>
      </Link>
      <div className="options">
        <Link to="/">
          {props.auth.isAuthenticated() ? (
            <div className="option" onClick={() => props.auth.logout()}>
              Sign Out
            </div>
          ) : (
            <div className="option" onClick={() => props.auth.login()}>
              Sign In
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
