import React from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';
import { fetchConfig } from 'reducers/config.reducer';

class Menu extends React.Component {
  displayName: 'Menu';
  static propTypes = {
    dispatch: P.func.isRequired,
    config: P.shape({
      period: P.string.isRequired,
      days_to_next_period: P.number.isRequired,
      elapsed_period_days: P.number.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(fetchConfig());
  }

  render() {
    const { period, days_to_next_period, elapsed_period_days } = this.props.config;

    return (
      <div>
        <div>{ `period: ${period}, elapsed: ${elapsed_period_days}, ending in: ${days_to_next_period}`}</div>
      </div>
    );
  }
}

export default connect(state => ({
  config: state.config,
}))(Menu);
