import React from 'react';
import * as browserHistory from 'history';
import Auth from './Auth';

const history = browserHistory.createBrowserHistory();

const auth = new Auth(history);

const AuthedContext = React.createContext();

export default AuthedContext;
