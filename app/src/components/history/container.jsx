import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { fetchEndorsedSuggestions } from 'reducers/history.reducer'; //eslint-disable-line
import css from './style.css';
import { EndorsedList } from './EndorsedList';

class History extends React.Component {
  static displayName = 'AddSuggestion';
  static propTypes = {
    endorsed: P.arrayOf(P.object).isRequired,
    dispatch: P.func.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchEndorsedSuggestions());
  }

  render() {
    const { config, endorsed } = this.props;

    return (
      <div className={css.root}>
        <EndorsedList items={endorsed} />
      </div>
    );
  }
}

export default connect(state => ({
  endorsed: state.history.endorsed,
  config: state.config,
}))(History);
