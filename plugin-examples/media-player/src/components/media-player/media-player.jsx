import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './media-player.less';

class MediaPlayer extends Component {
  static displayName = 'MediaPlayerComponent';

  static propTypes = {
    videoURLs: PropTypes.array.isRequired,
    storeState: PropTypes.oneOf(['initial', 'fetching', 'done', 'outdated']),
    error: PropTypes.object
  };

  static defaultProps = {
    videoURLs: [],
    storeState: 'initial',
    error: null
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.queryBar = window.app.appRegistry.getComponent('Query.QueryBar');
  }

  onApplyClicked() {
    this.props.actions.fetchVideos();
  }

  onResetClicked() {
    this.props.actions.reset();
    this.props.actions.fetchVideos();
  }

  renderError() {
    if (this.props.error) {
      return (<div>{this.props.error}</div>);
    }

    return null;
  }

  renderContent() {
    if (!_.includes(['done', 'outdated'], this.props.storeState)) {
      return null;
    }

    return (
      <div className="column-container">
        {this.renderError()}
        <div className="column main">
          {this.props.videoURLs.map((url) => {
            if (url) {
              return <video className={classnames(styles.videoElement)} controls src={url}>No video support</video>;
            }

            return <div className={classnames(styles.videoElement)}>Does not contain a playable video</div>;
          })}
        </div>
      </div>
    );
  }

  /**
   * Render MediaPlayer component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={classnames(styles.root)}>
        <div className="controls-container">
          <this.queryBar
            buttonLabel="Find"
            onApply={this.onApplyClicked.bind(this)}
            onReset={this.onResetClicked.bind(this)} />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

export default MediaPlayer;
export { MediaPlayer };
