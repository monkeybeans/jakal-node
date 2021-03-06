import React from 'react';
import P from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

class EndorsedList extends React.Component {
  renderItems = () => {
    const { items } = this.props;

    return items.map((i) => {
      const voteDate = new Date(i.submitter.time);
      const year = voteDate.getFullYear();
      const month = voteDate.getMonth() + 1;
      const day = voteDate.getDate();

      return (
        <Card key={`endorsed-card-${i._id}`} raised>
          <Card.Content>
            <Card.Header>{ i.name }</Card.Header>
            <Card.Meta>by { i.submitter.username }</Card.Meta>
            <Card.Meta>{ `${year}, ${day}/${month}` }</Card.Meta>
            <Icon name="users" color="orange" />{i.voting.num_of_votes}
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Recent Endorsed Instruments</h2>
        <Card.Group itemsPerRow={1}>
          { this.renderItems() }
        </Card.Group>
      </div>
    );
  }
}

EndorsedList.propTypes = {
  items: P.arrayOf(P.object).isRequired,
};

export { EndorsedList };
