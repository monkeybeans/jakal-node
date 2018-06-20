import React from 'react';
import P from 'prop-types';
import { Card, Feed, Statistic } from 'semantic-ui-react';

export class Generic extends React.Component {
  static propTypes = {
    statistics: P.object.isRequired,
  }

  renderSingleData = (label, data) => (
    <Card centered raised fluid>
      <Statistic label={`${label} (${data.meta})`} value={data.value} />
    </Card>
  )

  renderMultiData = (label, data) => (
    <Card centered raised fluid>
      <Card.Content>
        <Card.Header>{ label }</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          { data.map(this.renderFeed) }
        </Feed>
      </Card.Content>
    </Card>
  )

  renderFeed = ({ value, meta }) => (
    <Feed.Event>
      <Feed.Label icon="comments" />
      <Feed.Content>
        <Feed.Summary>
          { meta }
        </Feed.Summary>
        <Feed.Extra content={value} />
      </Feed.Content>
    </Feed.Event>
  )


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

    console.log('statistics: ', statistics);

    const { stats } = statistics;

    // const voteRation = votingNumbers.totalNumVotes / votingNumbers.totalNumSuggestions;

    return (
      <div>
        { stats.map((s) => {
            const { label, data } = s;
            if (Array.isArray(s.data)) {
              return this.renderMultiData(label, data);
            }

            return this.renderSingleData(label, data);
          })
        }
      </div>
    );
  }
}
