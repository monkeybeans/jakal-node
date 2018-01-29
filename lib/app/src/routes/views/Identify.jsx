import React from 'react';
import { Grid } from 'semantic-ui-react';
import Login from '../../components/login/container';
import '../../root.style.css';

class Identify extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={6} styleName="root" >
          <Login />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Identify;
