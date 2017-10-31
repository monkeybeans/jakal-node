import React from 'react';
import P from 'prop-types';
import { Item } from 'semantic-ui-react';

export default class SuggestionList extends React.Component {
  static propTypes = {
    items: P.arrayOf(P.object).isRequired,
  }

  renderItems = () => {
    const { items } = this.props;

    return items.map(i => (
      <Item.Content key={`suggestion-list-.${i._id}`}>
        <Item.Header>Fill in item later { i.name }</Item.Header>
        <Item.Description>{ i.description }</Item.Description>
      </Item.Content>
    ));
  }

  render() {
    return (
      <Item.Group>
        <h1>This is the suggestions...</h1>
        { this.renderItems() }
      </Item.Group>
    );
  }
}
