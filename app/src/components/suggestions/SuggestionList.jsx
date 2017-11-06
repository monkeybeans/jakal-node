import React from 'react';
import P from 'prop-types';
import { Item } from 'semantic-ui-react';
import { VoteButton } from './VoteButton';

export class SuggestionList extends React.Component {
  renderItems = () => {
    const { items, sendSuggesionVote } = this.props;

    return items.map(i => (
      <Item key={`suggestion-list-.${i._id}`}>
        <Item.Content>
          <Item.Header>{ i.name }</Item.Header>
          <Item.Description>{ i.description }</Item.Description>
        </Item.Content>
        <Item.Extra>
          <VoteButton
            suggestionId={i._id}
            onVoteForSuggestion={sendSuggesionVote}
          />
        </Item.Extra>
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

SuggestionList.propTypes = {
  items: P.arrayOf(P.object).isRequired,
  sendSuggesionVote: P.func.isRequired,
};
