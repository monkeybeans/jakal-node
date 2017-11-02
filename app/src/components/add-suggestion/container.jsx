import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { fetchSuggestions, sendSuggestion } from 'reducers/dynamics.reducer'; //eslint-disable-line
import css from './style.css';
import AddSuggestion from './AddSuggestion';
import SuggestionList from './SuggestionList';

class Container extends React.Component {
  static displayName = 'AddSuggestion';
  static propTypes = {
    suggestions: P.arrayOf(P.object).isRequired,
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
    return (
      <div className={css.root}>
        <AddSuggestion
          onSend={this.onSendSuggestion}
        />
        <SuggestionList items={this.props.suggestions} />
      </div>
    );
  }
}


export default connect(state => ({
  suggestions: state.dynamics.suggestions,
}))(Container);
