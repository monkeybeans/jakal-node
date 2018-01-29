import React from 'react';
import P from 'prop-types';
import { Grid, Segment, Header } from 'semantic-ui-react';

class ErrorNotFound extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer={5} mobile={16}>
          <Segment style={{ background: '0xfff' }}>
            <Header>
              <h2>404</h2>
            </Header>
            <p>This url has noting to show...</p>
            <p>Did really wanted to go to: {this.props.location.pathname}</p>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

ErrorNotFound.propTypes = {
  location: P.object.isRequired,
};

export default ErrorNotFound;
