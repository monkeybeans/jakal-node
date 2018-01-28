import React from 'react';
import P from 'prop-types';
import api from 'axios';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { fetchConfig } from 'reducers/config.reducer';
import style from './style.css';
import { PeriodSteps } from './PeriodSteps';
import { UserInfo } from './UserInfo';

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

  handleLogout = () => {
    api
      .get('/jakal-web-BETA/logout')
      .then(() => window.location.reload(true))
      .catch(e => console.error(e));
  }

  componentWillMount() {
    this.props.dispatch(fetchConfig());
  }

  render() {
    const {
      period,
      days_to_next_period,
      elapsed_period_days,
      user,
    } = this.props.config;

    return (
      <Segment className={style.root}>
        <UserInfo handleLogout={this.handleLogout} user={user} />
        <PeriodSteps
          period={period}
          daysToNextPeriod={days_to_next_period}
          elapsedPeriodDays={elapsed_period_days}
        />
      </Segment>
    );
  }
}

export default connect(state => ({
  config: state.config,
}))(Menu);
