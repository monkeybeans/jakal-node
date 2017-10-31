import { combineReducers } from 'redux';
import dynamics from './dynamics.reducer';
import error from './error.reducer';

export default combineReducers({
  dynamics,
  error,
});
