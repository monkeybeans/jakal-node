const makeActionTypes = (types, context) =>
  types.reduce((at, t) => ({ ...at, [t]: `${context}/${t}` }), {});

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
    case at.FETCH_DYNAMICS_START:
      return { ...state, suggestions: payload.suggestions };
    case at.FETCH_DYNAMICS_FAIL:
      return { ...state, error: payload.err };
    default:
      return state;
  }
}

const fetchSuggestions = () => (dispatch, getState, api) => {
  dispatch({ type: at.FETCH_DYNAMICS_START });

  api
    .get('/api/v1/dynamics/suggestions')
    .then((payload) => {
      dispatch({
        type: at.FETCH_DYNAMICS_DONE,
        payload,
      });
    })
    .catch((error) => {
      dispatch({
        type: at.FETCH_DYNAMICS_FAIL,
        error,
      });
    });
};

export {
  reducer as default,
  fetchSuggestions,
};
