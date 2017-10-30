import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import { Button } from 'semantic-ui-react';
import { fetchSuggestions } from 'reducers/suggestions.reducer'; //eslint-disable-line
import css from './style.css';
import SuggestionList from './SuggestionList';

class Container extends React.Component {
  static displayName = 'AddSuggestion';
  static propTypes = {
    suggestions: P.arrayOf(P.string).isRequired,
    dispatch: P.func.isRequired,
  }

  onComponentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchSuggestions);
  }

  render() {
    return (
      <div className={css.root}>
        <Button primary fluid>+ ADD A SUGGESTION</Button>
        <SuggestionList items={this.props.suggestions} />
      </div>
    );
  }
}


export default connect(state => ({
  suggestions: state.suggestions.suggestions,
}))(Container);
