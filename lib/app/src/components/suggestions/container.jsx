import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { fetchSuggestions, sendSuggestion, sendSuggestionVote } from '../../reducers/dynamics.reducer'; //eslint-disable-line
import { AddSuggestion } from './AddSuggestion';
import { SuggestionList } from './SuggestionList';
import PeriodType from '../../../../shared/types/PeriodType';
import './style.css';

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
    const hideAddSuggestion = config.period !== PeriodType.SUGGEST;
    const enableVoting = config.period === PeriodType.VOTE;
    const showNumVotes = config.period === PeriodType.DISPLAY;
    const hasVoted = config.userHasVoted === true;

    return (
      <div styleName="root">
        <SuggestionList
          items={suggestions}
          sendSuggesionVote={id => dispatch(sendSuggestionVote(id))}
          enableVoting={enableVoting}
          hasVoted={hasVoted}
          showNumVotes={showNumVotes}
        />
        <AddSuggestion
          hide={hideAddSuggestion}
          onSend={this.onSendSuggestion}
        />
      </div>
    );
  }
}

export default connect(state => ({
  suggestions: state.dynamics.suggestions,
  config: state.config,
}))(Container);
