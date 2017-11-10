import { makeActionTypes } from './utils';

const at = makeActionTypes([
  'FETCH_HISTORY_START',
  'FETCH_HISTORY_DONE',
  'FETCH_HISTORY_FAIL',
], 'history');

const defaultState = {
  endorsed: [],
};

function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case at.FETCH_HISTORY_DONE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

const fetchEndorsedSuggestions = () => (dispatch, getState, { api }) => {
  dispatch({ type: at.FETCH_HISTORY_START });

  api
    .get('/api/v1/history')
    .then(({ data }) => {
      dispatch({
        type: at.FETCH_HISTORY_DONE,
        payload: { endorsed: data },
      });
    })
    .catch((error) => {
      dispatch({
        type: at.FETCH_HISTORY_FAIL,
        payload: error,
      });
    });
};

export {
  reducer as default,
  fetchEndorsedSuggestions,
};
