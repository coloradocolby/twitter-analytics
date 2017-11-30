import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';
import { login, logout, storeCredential } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { PersistGate } from 'redux-persist/es/integration/react'

import {configureStore} from './store/configureStore'

const { persistor, store } = configureStore()

// const onBeforeLift = () => {
//   // take some action before the gate lifts
// }

const jsx = (
  <Provider store={store}>
    <PersistGate 
      // onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  console.log('renderApp');
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    console.log('onAuthStateChange w/ user', user);
  } else {
    console.log('onAuthStateChange w/o user', user);
    if (history.location.pathname === '/dashboard') {
      history.push('/');
    }
  }
});


firebase.auth().getRedirectResult().then(({ user, credential}) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    if (user && credential) {
      store.dispatch(login(user));
      store.dispatch(storeCredential(credential));
    } 
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
}).catch(function(error) {
  console.log('error', error);
});