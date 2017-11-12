import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';

ReactDOM.hydrate(
  React.createElement(Auth),
  document.getElementById('authenticate-root'), // eslint-disable-line no-undef
);
