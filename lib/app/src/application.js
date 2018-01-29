import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes/Router.client';

ReactDOM.hydrate(
  React.createElement(Router),
  document.getElementById('app-root'), // eslint-disable-line no-undef
);
