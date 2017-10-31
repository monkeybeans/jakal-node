import React from 'react';
import { Grid } from 'semantic-ui-react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from 'axios';
import reducers from 'reducers'; //eslint-disable-line
import Menu from './menu/container';
import AddSuggestion from './add-suggestion/container';
import css from './root.style.css';

/* eslint-disable no-underscore-dangle */
const applyBrowserDebuggerMiddleware = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const store = createStore(
  reducers,
  applyBrowserDebuggerMiddleware(),
  applyMiddleware(thunk.withExtraArgument({ api })),
);

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={12} className={css.root}>
          <Provider store={store}>
            <div>
              <Menu />
              <AddSuggestion />
            </div>
          </Provider>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
