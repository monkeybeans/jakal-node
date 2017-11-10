import React from 'react';
import P from 'prop-types';
import { Item, Icon, Segment, Header, Divider } from 'semantic-ui-react';
import { VoteButton } from './VoteButton';

export class SuggestionList extends React.Component {
  renderItems = () => {
    const {
      items, sendSuggesionVote, enableVoting, showNumVotes,
    } = this.props;

    return items.map(i => (
      <Item key={`suggestion-list-.${i._id}`}>
        <Icon name="line chart" size="huge" />
        <Item.Content>
          <Item.Header>{ i.name }</Item.Header>
          <Item.Description>{ i.description }</Item.Description>
          <Item.Extra>
            <VoteButton
              hide={!enableVoting}
              suggestionId={i._id}
              onVoteForSuggestion={sendSuggesionVote}
            />
            { showNumVotes ? <p><Icon circular name="users" color="teal" />{i.voting.num_of_votes}</p> : null }
          </Item.Extra>
        </Item.Content>
      </Item>
    ));
  }

  render() {
    const { items } = this.props;

    return (
      <Segment>
        <Header dividing>Suggestions so far - {items.length}</Header>
        <Item.Group divided>
          { this.renderItems() }
        </Item.Group>
      </Segment>
    );
  }
}

SuggestionList.propTypes = {
  items: P.arrayOf(P.object).isRequired,
  sendSuggesionVote: P.func.isRequired,
  enableVoting: P.bool.isRequired,
  showNumVotes: P.bool.isRequired,
};
