import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Container, Grid, Segment } from 'semantic-ui-react';
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
      <div className={css.root}>
        <Menu />
        <Grid>
          <Grid.Column computer={11} mobile={16}>
            <Suggestions />
          </Grid.Column>
          <Grid.Column computer={5} mobile={16}>
            <History />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const appWithStore = React.createElement(Provider, { store }, React.createElement(App));

ReactDOM.render(
  appWithStore,
  document.getElementById('app-root'), // eslint-disable-line no-undef
);
