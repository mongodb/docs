import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ENTERPRISE, COMMUNITY } from 'constants/server-version';

import styles from './server-version.less';

class ServerVersion extends Component {
  static displayName = 'ServerVersionComponent';

  // Indicate the property types of the state variables (for validation)
  static propTypes = {
    versionNumber: PropTypes.string,
    versionDistro: PropTypes.oneOf(['', ENTERPRISE, COMMUNITY])
  };

  // Set the default values of the state variables to empty strings
  static defaultProps = {
    versionNumber: '',
    versionDistro: ''
  };

  /**
   * Render ServerVersion component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    // If either state variable is an empty string, do not render any html
    if (this.props.versionNumber === '' || this.props.versionDistro === '') {
      return null;
    }
    // else, render an html element containing the versionNumber
    // and versionDistro variables
    return (
      <div className={classnames(styles['server-version'])} data-test-id="server-version">
        MongoDB {this.props.versionNumber} {this.props.versionDistro}
      </div>
    );
  }
}

// Export the store so it can be used by other pieces of our application
export default ServerVersion;
export { ServerVersion };
