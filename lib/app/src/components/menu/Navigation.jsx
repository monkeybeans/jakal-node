import React from 'react';
import P from 'prop-types';
import { Menu } from 'semantic-ui-react';

export class Navigation extends React.Component {
  render() {
    const { user } = this.props;

    // <Menu.Item name={'Statistics in progress'} />
    return (
      <Menu secondary >
        <Menu.Item name="Overview And Actions" active />
        <Menu.Item
          name={`Logout ${user.username}`}
          onClick={this.props.handleLogout}
          position="right"
        />
      </Menu>
    );
  }
}

Navigation.propTypes = {
  handleLogout: P.func.isRequired,
  user: P.object.isRequired,
};
