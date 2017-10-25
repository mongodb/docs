import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import UsersActions from 'actions';

const debug = require('debug')('mongodb-compass:stores:users');

/**
 * Users store.
 */
const UsersStore = Reflux.createStore({
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
  listenables: UsersActions,

  /**
   * Initialize everything that is not part of the store's state.
   */
  init() {
  },

  /**
   * This method is called when all plugins are activated.
   */
  onActivated(appRegistry) {
    // Events emitted from the app registry:
    appRegistry.on('database-changed', this.onDatabaseChanged.bind(this));
  },

  /**
   * Initialize the Users store state. The returned object must
   * contain all keys that you might want to modify with this.setState().
   *
   * @return {Object} initial store state.
   */
  getInitialState() {
    return {
      status: 'enabled',
      users: [],
      database: '',
      error: null
    };
  },

  _setDatabaseUsers(dbName) {
    const filter = {db: dbName};

    const findOptions = {
      fields: { user: 1, db: 1, credentials: 1, roles: 1 }
    };

    window.app.dataService.find('admin.system.users', filter, findOptions,
                               (findError, documents) => {
      if (findError) {
        this.setState({error: findError});
        return;
      }
      this.setState({database: dbName});
      this.setState({users: documents});
    });
  },

  onDatabaseChanged(namespace) {
    if (!namespace || namespace.includes('.') || namespace === this.state.database) {
      return;
    }
    this._setDatabaseUsers(namespace);
  },

  /**
   * log changes to the store as debug messages.
   * @param  {Object} prevState   previous state.
   */
  storeDidUpdate(prevState) {
    debug('Users store changed from', prevState, 'to', this.state);
  }
});

export default UsersStore;
export { UsersStore };
