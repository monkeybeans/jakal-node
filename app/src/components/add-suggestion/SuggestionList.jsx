import React from 'react';
import P from 'prop-types';

export default class SuggestionList extends React.Component {
  static propTypes = {
    items: P.arrayOf(P.string).isRequired,
  }

  renderItems = () => {
    const { items } = this.props;

    return items.map(i => <div>Fill in item later { i }</div>);
  }

  render() {
    return (
      <div>
        <h2>This is the suggestions...</h2>
        { this.renderItems() }
      </div>
    );
  }
}
