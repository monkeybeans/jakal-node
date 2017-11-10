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
      const day = voteDate.getDay();

      return (
        <Card key={`endorsed-card-${i._id}`}>
          <Card.Content>
            <Card.Header>{ i.name }</Card.Header>
            <Card.Meta>{ `${year}, ${day}/${month}` }</Card.Meta>
            <Icon name="users" color="orange" />{i.voting.num_of_votes}
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <Card.Group>
        { this.renderItems() }
      </Card.Group>
    );
  }
}

EndorsedList.propTypes = {
  items: P.arrayOf(P.object).isRequired,
};

export { EndorsedList };
