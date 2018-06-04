import React from 'react';
import P from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    const { user, location: { pathname } } = this.props;

    // <Menu.Item name={'Statistics in progress'} />
    // <Link to="/">Suggestions</Link>
    // <Link to="/stats">/stats</Link>

    return (
      <Menu inverted>
        <Link to="/">
          <Menu.Item link color="grey" name="{ Suggestions }" active={pathname === '/'} />
        </Link>
        <Link to="/stats">
          <Menu.Item link color="grey" name="{ Billlboard }" active={pathname === '/stats'} />
        </Link>
        <Menu.Item
          name={`Logout ${user.username}`}
          onClick={this.props.handleLogout}
          position="right"
          color="orange"
        />
      </Menu>
    );
  }
}

Navigation.propTypes = {
  handleLogout: P.func.isRequired,
  user: P.object.isRequired,
};

const wrapped = withRouter(props => <Navigation {...props} />);
export {
  wrapped as Navigation,
};
