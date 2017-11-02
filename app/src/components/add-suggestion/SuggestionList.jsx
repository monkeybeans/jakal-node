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
      <Item key={`suggestion-list-.${i._id}`}>
        <Item.Content>
          <Item.Header>{ i.name }</Item.Header>
          <Item.Description>{ i.description }</Item.Description>
        </Item.Content>
      </Item>
    ));
  }

  render() {
    return (
      <Item.Group>
        { this.renderItems() }
      </Item.Group>
    );
  }
}
