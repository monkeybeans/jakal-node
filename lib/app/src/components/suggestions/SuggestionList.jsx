import React from 'react';
import P from 'prop-types';
import { Item, Icon, Segment, Header } from 'semantic-ui-react';
import { VoteButton } from './VoteButton';

export class SuggestionList extends React.Component {
  renderItems = () => {
    const {
      items, sendSuggesionVote, enableVoting, showNumVotes, hasVoted,
    } = this.props;

    return items.map(i => (
      <Item key={`suggestion-list-.${i._id}`}>
        <Icon name="line chart" size="huge" />
        <Item.Content>
          <Item.Header>{ i.name }<i>{showNumVotes ? ` by ${i.submitter.username}` : ''}</i></Item.Header>
          <Item.Description>{ i.description }</Item.Description>
          <Item.Extra>
            <VoteButton
              hide={!enableVoting}
              suggestionId={i._id.toString()}
              onVoteForSuggestion={sendSuggesionVote}
              disabled={hasVoted}
            />
            { showNumVotes ? <p><Icon circular name="users" color="teal" />{i.voting.num_of_votes}</p> : null }
          </Item.Extra>
        </Item.Content>
      </Item>
    ));
  }

  render() {
    const { items } = this.props;

    if (items.length === 0) { return null; }

    const numVotes = items.reduce((n, i) => n += i.voting.num_of_votes, 0);
    const peopleVoted = numVotes ? 'people voted: {numVotes}' : '';

    const headerTexts = [
      `Suggestions submitted: ${items.length}`,
      peopleVoted,
    ].filter(Boolean);

    return (
      <Segment>
        <Header dividing>{ headerTexts.join(' - ') }</Header>
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
  hasVoted: P.bool.isRequired,
  showNumVotes: P.bool.isRequired,
};
