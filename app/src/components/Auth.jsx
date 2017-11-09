import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'semantic-ui-react';
import Login from './login/container';
import css from './root.style.css';

class App extends React.Component {
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

ReactDOM.render(
  React.createElement(App),
  document.getElementById('authenticate-root'), // eslint-disable-line no-undef
);
