import UsersPlugin from './plugin';
import UsersActions from 'actions';
import UsersStore from 'stores';

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'Users',
  component: UsersPlugin
};

/**
 * Activate all the components in the Users package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
  // Register the UsersPlugin as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab
  //   - Database.Tab
  //   - Collection.Tab
  //   - CollectionHUD.Item
  //   - Header.Item

  appRegistry.registerRole('Database.Tab', ROLE);
  appRegistry.registerAction('Users.Actions', UsersActions);
  appRegistry.registerStore('Users.Store', UsersStore);
}

/**
 * Deactivate all the components in the Users package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterRole('Database.Tab', ROLE);
  appRegistry.deregisterAction('Users.Actions');
  appRegistry.deregisterStore('Users.Store');
}

export default UsersPlugin;
export { activate, deactivate };
