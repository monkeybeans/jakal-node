import { makeActionTypes } from './utils';
import { fetchConfig } from './config.reducer';

const at = makeActionTypes([
  'FETCH_SUGGESTIONS_START',
  'FETCH_SUGGESTIONS_DONE',
  'FETCH_SUGGESTIONS_FAIL',

  'SEND_SUGGESTION_START',
  'SEND_SUGGESTION_DONE',
  'SEND_SUGGESTION_FAIL',

  'VOTE_ON_SUGGESTION_START',
  'VOTE_ON_SUGGESTION_DONE',
  'VOTE_ON_SUGGESTION_FAIL',
], 'suggestions');

const defaultState = {
  suggestions: [],
  proposedSuggestion: {},
};

function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case at.FETCH_SUGGESTIONS_DONE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

const fetchSuggestions = () => (dispatch, getState, { api }) => {
  dispatch({ type: at.FETCH_SUGGESTIONS_START });

  api
    .get('/jakal/api/v1/dynamics/suggestions')
    .then(({ data }) => {
      dispatch({
        type: at.FETCH_SUGGESTIONS_DONE,
        payload: { suggestions: data },
      });
    })
    .catch((error) => {
      dispatch({
        type: at.FETCH_SUGGESTIONS_FAIL,
        payload: error,
      });
    });
};

const sendSuggestion = ({ name, description }) => (dispatch, getState, { api }) => {
  dispatch({ type: at.SEND_SUGGESTION_START });

  api
    .post('/jakal/api/v1/dynamics/suggestion', { name, description })
    .then(() => {
      dispatch({ type: at.SEND_SUGGESTION_DONE });
      dispatch(fetchSuggestions());
    })
    .catch(() => dispatch({ type: at.SEND_SUGGESTION_FAIL }));
};

const sendSuggestionVote = id => (dispatch, getState, { api }) => {
  dispatch({ type: at.VOTE_ON_SUGGESTION_START });

  api
    .post(`/jakal/api/v1/dynamics/suggestion/${id}/vote`)
    .then(() => {
      dispatch({ type: at.VOTE_ON_SUGGESTION_DONE });
      dispatch(fetchSuggestions());
      dispatch(fetchConfig());
    })
    .catch(() => dispatch({ type: at.VOTE_ON_SUGGESTION_FAIL }));
};


export {
  reducer as default,
  fetchSuggestions,
  sendSuggestion,
  sendSuggestionVote,
};
