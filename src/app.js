import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';
import { login, logout, storeCredential } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { PersistGate } from 'redux-persist/es/integration/react'

import {configureStore} from './store/configureStore'

const { persistor, store } = configureStore()

const jsx = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
    if (history.location.pathname === '/') {
      history.push('/compose');
    }
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(!user) {
    if (history.location.pathname === '/compose') {
      history.push('/');
    }
  }
});

firebase.auth().getRedirectResult().then(({ user, credential }) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    if (user && credential) {
      store.dispatch(login(user));
      store.dispatch(storeCredential(credential));
    } 
    renderApp();
}).catch(function(error) {
  console.log('error', error);
});