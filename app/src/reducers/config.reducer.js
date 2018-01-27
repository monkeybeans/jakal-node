import { makeActionTypes } from './utils';

const at = makeActionTypes([
  'FETCH_CONFIG_START',
  'FETCH_CONFIG_DONE',
  'FETCH_CONFIG_FAIL',
], 'config');

const defaultState = {
  period: '',
  days_to_next_period: -1,
  elapsed_period_days: -1,
};

function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case at.FETCH_CONFIG_DONE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

const fetchConfig = () => (dispatch, getState, { api }) => {
  dispatch({ type: at.FETCH_CONFIG_START });

  api
    .get('/jakal-web-BETA/api/v1/config')
    .then(({ data }) => {
      dispatch({
        type: at.FETCH_CONFIG_DONE,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: at.FETCH_CONFIG_FAIL,
        payload: error,
      });
    });
};


export {
  reducer as default,
  fetchConfig,
};
