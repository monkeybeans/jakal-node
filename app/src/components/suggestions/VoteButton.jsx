import React from 'react';
import P from 'prop-types';
import { Button } from 'semantic-ui-react';

export class VoteButton extends React.Component {
  handleOnClick = () => {
    const { onVoteForSuggestion, suggestionId } = this.props;

    onVoteForSuggestion(suggestionId);
  }

  render() {
    return (
      <Button onClick={this.handleOnClick} compact size="tiny" positive>
        vote
      </Button>
    );
  }
}

VoteButton.propTypes = {
  suggestionId: P.string.isRequired,
  onVoteForSuggestion: P.func.isRequired,
};
