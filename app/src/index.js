import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store';
import App from './components/App';

//const appWithStore = React.createElement(Provider, { store }, React.createElement(App));

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app'), //eslint-disable-line no-undef
);
