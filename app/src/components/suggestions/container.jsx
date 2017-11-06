import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { fetchSuggestions, sendSuggestion, sendSuggestionVote } from 'reducers/dynamics.reducer'; //eslint-disable-line
import css from './style.css';
import { AddSuggestion } from './AddSuggestion';
import { SuggestionList } from './SuggestionList';

class Container extends React.Component {
  static displayName = 'AddSuggestion';
  static propTypes = {
    suggestions: P.arrayOf(P.object).isRequired,
    config: P.object.isRequired,
    dispatch: P.func.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchSuggestions());
  }

  onSendSuggestion = ({ name, description }) => {
    this.props.dispatch(sendSuggestion({ name, description }));
  }

  render() {
    const { config, suggestions, dispatch } = this.props;
    const hideAddSuggestion = config.period !== 'SUGGEST';
    const enableVoting = config.period === 'VOTE';

    return (
      <div className={css.root}>
        <AddSuggestion
          hide={hideAddSuggestion}
          onSend={this.onSendSuggestion}
        />
        <SuggestionList
          items={suggestions}
          sendSuggesionVote={id => dispatch(sendSuggestionVote(id))}
          enableVoting={enableVoting}
        />
      </div>
    );
  }
}

export default connect(state => ({
  suggestions: state.dynamics.suggestions,
  config: state.config,
}))(Container);
