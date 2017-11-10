import { combineReducers } from 'redux';
import config from './config.reducer';
import dynamics from './dynamics.reducer';
import history from './history.reducer';
import error from './error.reducer';

export default combineReducers({
  config,
  dynamics,
  history,
  error,
});
