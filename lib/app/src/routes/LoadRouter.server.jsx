import React from 'react';
import P from 'prop-types';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import Page from './Page';
import reducers from '../reducers';

export default function LoadRouter(preloadedState) {
  const store = createStore(
    reducers,
    preloadedState,
  );

  const Router = props => (
    <StaticRouter location={props.location} context={props.context}>
      <Page store={store} />
    </StaticRouter>
  );

  Router.propTypes = {
    location: P.string.isRequired,
    context: P.object.isRequired,
  };

  return {
    getRouter: () => Router,
    getFinalState: () => store.getState(),
  };
}
