import React from 'react';
import P from 'prop-types';

export class Generic extends React.Component {
  static propTypes = {
    statistics: P.object.isRequired,
  }

  renderSubmitter = submitters => submitters.map(s => (
    <span>{s.username}(={s.numOfSubmitted}) </span>
  ))

  render() {
    const { statistics } = this.props;

    const { mostActiveSubmitters, votingNumbers } = statistics;

    const voteRation = votingNumbers.totalNumVotes / votingNumbers.totalNumSuggestions;
    return (
      <div>
        <p>Most active submitters: { this.renderSubmitter(mostActiveSubmitters) }</p>
        <p>
          Number of votes per suggestion: { voteRation.toFixed(2) }
        </p>

      </div>
    );
  }
}
