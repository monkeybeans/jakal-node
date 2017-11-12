import React from 'react';
import { Grid } from 'semantic-ui-react';
import Menu from './menu/container';
import Suggestions from './suggestions/container';
import History from './history/container';
import css from './root.style.css';

class App extends React.Component {
  render() {
    return (
      <div className={css.root}>
        <Menu />
        <Grid>
          <Grid.Column computer={11} mobile={16}>
            <Suggestions />
          </Grid.Column>
          <Grid.Column computer={5} mobile={16}>
            <History />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
