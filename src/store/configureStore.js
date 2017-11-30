import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import authReducer from '../reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(config, { auth: authReducer});

export const configureStore = () => {
  let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return { persistor, store }
};