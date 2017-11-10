import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from 'axios';
import reducers from 'reducers'; //eslint-disable-line
import Menu from './menu/container';
import Suggestions from './suggestions/container';
import History from './history/container';
import css from './root.style.css';

/* eslint-disable no-underscore-dangle */
const applyBrowserDebuggerMiddleware = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const store = createStore(
  reducers,
  applyBrowserDebuggerMiddleware(),
  applyMiddleware(thunk.withExtraArgument({ api })),
);

class App extends React.Component {
  render() {
    return (
      <div stylename={css.root}>
        <div className={css.app_header}>
          <Menu />
        </div>
        <div className={css.app_body}>
          <Suggestions />
          <History />
        </div>
      </div>
    );
  }
}

const appWithStore = React.createElement(Provider, { store }, React.createElement(App));

ReactDOM.render(
  appWithStore,
  document.getElementById('app-root'), // eslint-disable-line no-undef
);
