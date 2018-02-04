import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { fetchEndorsedSuggestions } from '../../reducers/history.reducer';
import { EndorsedList } from './EndorsedList';
import './style.css';

class History extends React.Component {
  static displayName = 'AddSuggestion';
  static propTypes = {
    endorsed: P.arrayOf(P.object).isRequired,
    dispatch: P.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchEndorsedSuggestions());
  }

  render() {
    const { endorsed } = this.props;

    return (
      <Segment styleName="root">
        <EndorsedList items={endorsed} />
      </Segment>
    );
  }
}

export default connect(state => ({
  endorsed: state.history.endorsed,
  config: state.config,
}))(History);
