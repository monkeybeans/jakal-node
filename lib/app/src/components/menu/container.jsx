import React from 'react';
import P from 'prop-types';
import api from 'axios';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { fetchConfig } from '../../reducers/config.reducer';
import { PeriodSteps } from './PeriodSteps';
import { Navigation } from './Navigation';
import './style.css';

class Menu extends React.Component {
  displayName: 'Menu';
  static propTypes = {
    dispatch: P.func.isRequired,
    config: P.shape({
      user: P.object.isRequired,
      period: P.string.isRequired,
      days_to_next_period: P.number.isRequired,
      elapsed_period_days: P.number.isRequired,
    }).isRequired,
  }

  handleLogout = () => {
    api
      .get('/logout')
      .then(() => window.location.reload(true))
      .catch(e => console.error(e));
  }

  componentDidMount() {
    this.props.dispatch(fetchConfig());
  }

  render() {
    const {
      period,
      days_to_next_period: daysToNextPeriod,
      elapsed_period_days: elapsedPeriodDays,
      user,
    } = this.props.config;

    return (
      <Segment styleName="root">
        <Navigation handleLogout={this.handleLogout} user={user} />
        <PeriodSteps
          period={period}
          daysToNextPeriod={daysToNextPeriod}
          elapsedPeriodDays={elapsedPeriodDays}
        />
      </Segment>
    );
  }
}

export default connect(state => ({
  config: state.config,
}))(Menu);
