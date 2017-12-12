import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './ssh-tunnel-status.less';

class SshTunnelStatus extends Component {
  static displayName = 'SshTunnelStatusComponent';

  // Indicate the property types of the state variables (for validation):
  static propTypes = {
    sshTunnel: PropTypes.bool,
    sshTunnelHostPortString: PropTypes.string
  };

  // Set the default values of the state variables:
  static defaultProps = {
    sshTunnel: false,
    sshTunnelHostPortString: ''
  };

  /**
   * Render SshTunnelStatus component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    // if the sshTunnel prop is false, do not render any html
    if (!this.props.sshTunnel) {
      return null;
    }

    return (
      // else, render html based on the state variables
      <div
        data-test-id="ssh-tunnel-status"
        className={classnames(styles['ssh-tunnel-status'])}>
        <i className="fa fa-lock" aria-hidden />
        <div className={classnames(styles['ssh-tunnel-status-label'])}>
          <div className={classnames(styles['ssh-tunnel-status-label-is-static'])}>
            SSH connection via:
          </div>
          <div className={classnames(styles['ssh-tunnel-status-string'])}>
            {this.props.sshTunnelHostPortString}
          </div>
        </div>
      </div>
    );
  }
}

// Export the store so it can be used by other pieces of our application
export default SshTunnelStatus;
export { SshTunnelStatus };
