import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import api from 'axios';
import { createStore, applyMiddleware } from 'redux';
import Page from './Page';
import reducers from '../reducers';

const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

/* eslint-disable no-underscore-dangle */
const applyBrowserDebuggerMiddleware = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const store = createStore(
  reducers,
  applyBrowserDebuggerMiddleware(),
  applyMiddleware(thunk.withExtraArgument({ api })),
  preloadedState,
);

export default function () {
  return (
    <BrowserRouter>
      <Page store={store} />
    </BrowserRouter>
  );
}
