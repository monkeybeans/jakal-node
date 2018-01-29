import React from 'react';
import { Grid } from 'semantic-ui-react';
import Menu from '../../components/menu/container';
import Suggestions from '../../components/suggestions/container';
import History from '../../components/history/container';
import '../../root.style.css';

class Collaboration extends React.Component {
  render() {
    return (
      <div styleName="root">
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

export default Collaboration;
