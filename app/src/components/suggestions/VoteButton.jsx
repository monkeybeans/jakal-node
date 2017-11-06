import React from 'react';
import P from 'prop-types';
import { Button } from 'semantic-ui-react';

export class VoteButton extends React.Component {
  handleOnClick = () => {
    const { onVoteForSuggestion, suggestionId } = this.props;

    onVoteForSuggestion(suggestionId);
  }

  render() {
    const { hide } = this.props;

    if (hide === true) { return null; }

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
  hide: P.bool.isRequired,
};
