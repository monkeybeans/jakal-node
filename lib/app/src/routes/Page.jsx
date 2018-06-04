import React from 'react';
import P from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Collaboration from './views/Collaboration';
import Billboard from './views/Billboard';
import Identify from './views/Identify';
import ErrorNotFound from './views/ErrorNotFound';
// import { Navigation } from '../components/menu/Navigation';

const App = props => (
  <Provider store={props.store}>
    <Switch>
      <Route exact path="/" component={Collaboration} />
      <Route exact path="/stats" component={Billboard} />
      <Route exact path="/auth" component={Identify} />
      <Route component={ErrorNotFound} />
    </Switch>
  </Provider>
);


App.propTypes = {
  store: P.object.isRequired,
};
export default App;
