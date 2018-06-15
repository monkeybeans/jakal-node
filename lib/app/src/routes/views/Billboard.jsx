import React from 'react';
import { Grid } from 'semantic-ui-react';
import Menu from '../../components/menu/container';
import Statistics from '../../components/statistics/container';
import '../../root.style.css';

class Billboard extends React.Component {
  render() {
    return (
      <div styleName="root">
        <Menu />
        <Grid>
          <Grid.Column computer={10} mobile={16}>
            <h1>Statistics</h1>
            <Statistics />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Billboard;
