import React from 'react';
import P from 'prop-types';
import { Card, Feed, Statistic } from 'semantic-ui-react';

export class Generic extends React.Component {
  static propTypes = {
    statistics: P.object.isRequired,
  }

  renderSubmitter = submitters => submitters.map(s => (
    <Feed.Event>
      <Feed.Label icon="comments" />
      <Feed.Content>
        <Feed.Summary>
          {s.username}
        </Feed.Summary>
        <Feed.Extra content={`submitted: ${s.numOfSubmitted}`} />
      </Feed.Content>
    </Feed.Event>
  ))

  render() {
    const { statistics } = this.props;

    const { mostActiveSubmitters, votingNumbers } = statistics;

    const voteRation = votingNumbers.totalNumVotes / votingNumbers.totalNumSuggestions;
    return (
      <div>
        <Card centered>
          <Card.Content>
            <Card.Header>Most active submitters</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              { this.renderSubmitter(mostActiveSubmitters) }
            </Feed>
          </Card.Content>
        </Card>
        <Card centered>
          <Statistic label="Vote / Suggestion" value={voteRation.toFixed(2)} />
        </Card>
      </div>
    );
  }
}
