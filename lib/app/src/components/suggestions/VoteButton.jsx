import React from 'react';
import P from 'prop-types';
import { Button } from 'semantic-ui-react';

export class VoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false,
    };
  }
  handleOnClick = () => {
    const { onVoteForSuggestion, suggestionId } = this.props;
    this.setState({ sending: true });
    onVoteForSuggestion(suggestionId);

    setTimeout(() => this.setState({ sending: false }), 500);
  }

  render() {
    const { sending } = this.state;
    const { hide, disabled } = this.props;

    if (hide === true) { return null; }

    return (
      <Button
        onClick={this.handleOnClick}
        compact
        positive
        size="small"
        loading={sending}
        disabled={disabled}
      >
        vote
      </Button>
    );
  }
}

VoteButton.propTypes = {
  suggestionId: P.string.isRequired,
  disabled: P.bool.isRequired,
  onVoteForSuggestion: P.func.isRequired,
  hide: P.bool.isRequired,
};
