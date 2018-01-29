import React from 'react';
import P from 'prop-types';
import { StaticRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import api from 'axios';
import { createStore, applyMiddleware } from 'redux';
import Page from './Page';
import reducers from '../reducers';

const preloadedState = {};
const store = createStore(
  reducers,
  preloadedState,
  applyMiddleware(thunk.withExtraArgument({ api })),
);

export default function Router(props) {
  return (
    <StaticRouter location={props.location} context={props.context}>
      <Page store={store} />
    </StaticRouter>
  );
}

Router.propTypes = {
  location: P.string.isRequired,
  context: P.object.isRequired,
};
