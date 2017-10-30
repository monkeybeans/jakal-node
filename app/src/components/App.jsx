import React from 'react';
import { Button } from 'semantic-ui-react';
import { Responsive, Segment } from 'semantic-ui-react';
import css from './root.style.css';

class App extends React.Component {
  render() {
    return (
      <Segment.Group>
        <Responsive as={Segment} maxWidth={767}>
          <div className={ css.banan }>Visible only if display has <code>767px</code> width and lower</div>
        </Responsive>
        <Responsive as={Segment} maxWidth={2569}>
          <div>Visible only if display has <code>2569px</code> width</div>
          <Button primary>Semantics Button..wiiii</Button>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default App;
