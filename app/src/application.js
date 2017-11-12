import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from 'axios';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers'; //eslint-disable-line
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const applyBrowserDebuggerMiddleware = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const store = createStore(
  reducers,
  applyBrowserDebuggerMiddleware(),
  applyMiddleware(thunk.withExtraArgument({ api })),
);

const AppWithStore = React.createElement(Provider, { store }, React.createElement(App));

ReactDOM.hydrate(
  AppWithStore,
  document.getElementById('app-root'), // eslint-disable-line no-undef
);
