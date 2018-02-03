import React from 'react';
import P from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Collaboration from './views/Collaboration';
import Statistics from './views/Statistics';
import Identify from './views/Identify';
import ErrorNotFound from './views/ErrorNotFound';
// import { Navigation } from '../components/menu/Navigation';

// @TODO; fix the // from the hosting server
const App = props => (
  <Provider store={props.store}>
    <Switch>
      <Route exact path="/jakal-web-BETA/" component={Collaboration} />
      <Route exact path="//jakal-web-BETA/" component={Collaboration} />

      <Route exact path="/jakal-web-BETA/stats" component={Statistics} />
      <Route exact path="//jakal-web-BETA/stats" component={Statistics} />

      <Route exact path="/jakal-web-BETA/auth" component={Identify} />
      <Route exact path="//jakal-web-BETA/auth" component={Identify} />
      <Route component={ErrorNotFound} />
    </Switch>
  </Provider>
);


App.propTypes = {
  store: P.object.isRequired,
};
export default App;
