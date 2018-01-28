import React from 'react';
import P from 'prop-types';
import { Menu } from 'semantic-ui-react';

export class UserInfo extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <Menu secondary>
        <Menu.Item name="Overview And Actions" active />
        <Menu.Item name={`Logout ${user.username}`} onClick={this.props.handleLogout} position="right" />
      </Menu>
    );
  }
}

UserInfo.propTypes = {
  handleLogout: P.func.isRequired,
  user: P.object.isRequired,
};
