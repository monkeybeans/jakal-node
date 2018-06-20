import { makeActionTypes } from './utils';

const at = makeActionTypes([
  'FETCH_STATISTICS_START',
  'FETCH_STATISTICS_DONE',
  'FETCH_STATISTICS_FAIL',
], 'statistics');

const defaultState = {
  stats: [],
};

function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case at.FETCH_STATISTICS_DONE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

const fetchStatistics = () => (dispatch, getState, { api }) => {
  dispatch({ type: at.FETCH_STATISTICS_START });

  api
    .get('/api/v1/statistics')
    .then(({ data }) => {
      dispatch({
        type: at.FETCH_STATISTICS_DONE,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: at.FETCH_STATISTICS_FAIL,
        payload: error,
      });
    });
};

export {
  reducer as default,
  fetchStatistics,
};
