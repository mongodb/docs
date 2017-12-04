import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import MediaPlayerActions from 'actions';
import toNS from 'mongodb-ns';

const debug = require('debug')('mongodb-compass:stores:media-player');

/**
 * Return true iff an input buffer has the magic number indicating an
 * EBML structure, which may be a WebM file. This is a quick-and-dirty
 * proxy to filter out a subset of ineligible fields.
 */
function isEBML(bin) {
  const view = new Uint8Array(bin);
  return view[0] === 0x1a &&
         view[1] === 0x45 &&
         view[2] === 0xdf &&
         view[3] === 0xa3;
}

/**
 * Media Player store.
 */
const MediaPlayerStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   *
   * If you call `this.setState({...})` this will cause the store to trigger
   * and push down its state as props to connected components.
   */
  mixins: [StateMixin.store],

  /**
   * listen to all actions defined in ../actions/index.jsx
   */
  listenables: MediaPlayerActions,

  /**
   * Initialize everything that is not part of the store's state.
   */
  init() {
    this.filter = {};
    this.sort = null;
    this.project = null;
    this.skip = 0;
    this.limit = 0;

    this.indexes = [];
    this.ns = '';
  },

  /**
   * This method is called when all plugins are activated. You can register
   * listeners to other plugins' stores here.
   *
   * If this plugin does not depend on other stores, you can delete the method.
   *
   * @param {Object} appRegistry - app registry containing all stores and components
   */
  onActivated(appRegistry) {
    // Events emitted from the app registry:
    appRegistry.on('query-changed', this.onQueryChanged.bind(this));
    appRegistry.getStore('App.NamespaceStore').
                listen(this.onNamespaceChanged.bind(this));
  },

  /**
   * Initialize the Media Player store state. The returned object must
   * contain all keys that you might want to modify with this.setState().
   *
   * @return {Object} initial store state.
   */
  getInitialState() {
    return {
      storeState: 'initial',
      error: null,
      videoURLs: []
    };
  },

  /**
   * Event handler for query bar state changes.
   */
  onQueryChanged(state) {
    if (state.ns && toNS(state.ns).collection) {
      this.filter = state.filter;
      this.project = state.project;
      this.sort = state.sort;
      this.skip = state.skip;
      this.limit = state.limit;
      this.ns = state.ns;

      if (this.state.storeState === 'done') {
        this.setState({storeState: 'outdated'});
      }
    }
  },

  /**
   * Event handler for database/collection changes.
   */
  onNamespaceChanged() {
    this.reset();
  },

  /**
   * Action to release the current list of videos, and reset this
   * store's data to a pristine state.
   */
  reset() {
    for (const url of this.state.videoURLs) {
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }

    this.setState(this.getInitialState());
  },

  /**
   * Action to fetch any documents associated with the current query
   * information associated with this MediaPlayerStore.
   */
  fetchVideos() {
    if (this.state.storeState === 'fetching') {
      return;
    }

    this.reset();

    this.setState({storeState: 'fetching'});

    const findOptions = {
      sort: this.sort,
      fields: this.project,
      skip: this.skip,
      limit: Math.min(5, this.limit)
    };

    window.app.dataService.find(this.ns, this.filter, findOptions,
                                (findError, documents) => {
      if (findError) {
        this.setState({error: findError});
        return;
      }

      const urls = [];
      try {
        for (const doc of documents) {
          if (isEBML(doc.data.buffer)) {
            const blob = new Blob([doc.data.buffer], {type: 'video/webm'});
            urls.push(URL.createObjectURL(blob));
          } else {
            urls.push('');
          }
        }
      } catch (error) {
        this.setState({error: error});
      }

      this.setState({videoURLs: urls, storeState: 'done'});
    });
  },

  /**
   * log changes to the store as debug messages.
   * @param  {Object} prevState   previous state.
   */
  storeDidUpdate(prevState) {
    debug('MediaPlayer store changed from', prevState, 'to', this.state);
  }
});

export default MediaPlayerStore;
export { MediaPlayerStore };
