import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Users.less';

class Users extends Component {
  static displayName = 'UsersComponent';

  static propTypes = {
    users: PropTypes.array.isRequired,
    database: PropTypes.string,
    error: PropTypes.object
  };

  static defaultProps = {
    users: [],
    database: '',
    error: null
  };

  onClick = () => {
    this.props.actions.toggleStatus();
  }

  /**
   * Render Users component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={classnames(styles.root)}>
        <h2 className={classnames(styles.title)}>{this.props.database} Users</h2>
        <table>
          <tr>
            <th>User</th>
            <th>Database</th>
            <th>Role</th>
          </tr>
          {
            this.props.users.map((user) => {
              return user.roles.map((role) => {
                return (
                  <tr>
                    <td>{user.user}</td>
                    <td>{role.db}</td>
                    <td>{role.role}</td>
                  </tr>
                 )
               });
            })
          }
        </table>
      </div>
    );
  }
}

export default Users;
export { Users };
