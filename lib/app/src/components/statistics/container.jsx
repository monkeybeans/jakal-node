import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { fetchStatistics } from '../../reducers/statistics.reducer';
import { Generic } from './Generic';
// import { Graphs } from './Graphs';
import './style.css';

class Container extends React.Component {
  static displayName = 'Statistics';
  static propTypes = {
    statistics: P.object.isRequired,
    dispatch: P.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchStatistics());
  }

  render() {
    const { statistics } = this.props;

    return (
      <Segment styleName="root">
        <Generic statistics={statistics} />
        { /* <Graphs statistics={statistics} /> */ }
      </Segment>
    );
  }
}

export default connect(state => ({
  statistics: state.statistics || {},
}))(Container);
