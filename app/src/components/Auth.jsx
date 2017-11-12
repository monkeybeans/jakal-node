import React from 'react';
import { Grid } from 'semantic-ui-react';
import Login from './login/container';
import css from './root.style.css';

class Auth extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={6} className={css.root}>
          <Login />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Auth;
