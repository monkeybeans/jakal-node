import { makeActionTypes } from './utils';

const at = makeActionTypes([
  'FETCH_DYNAMICS_START',
  'FETCH_DYNAMICS_DONE',
  'FETCH_DYNAMICS_FAIL',
], 'suggestions');

const defaultState = {
  suggestions: [],
  error: null,
};

function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case at.FETCH_DYNAMICS_DONE:
      return { ...state, ...payload };
    case at.FETCH_DYNAMICS_FAIL:
      return { ...state, error: payload.error };
    default:
      return state;
  }
}

const fetchSuggestions = () => (dispatch, getState, { api }) => {
  dispatch({ type: at.FETCH_DYNAMICS_START });

  api
    .get('/api/v1/dynamics/suggestions')
    .then(({ data }) => {
      dispatch({
        type: at.FETCH_DYNAMICS_DONE,
        payload: { suggestions: data },
      });
    })
    .catch((error) => {
      dispatch({
        type: at.FETCH_DYNAMICS_FAIL,
        payload: error,
      });
    });
};

export {
  reducer as default,
  fetchSuggestions,
};
