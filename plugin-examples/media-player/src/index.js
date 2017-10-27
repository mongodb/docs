import MediaPlayerPlugin from './plugin';
import MediaPlayerActions from 'actions';
import MediaPlayerStore from 'stores';

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'MediaPlayer',
  component: MediaPlayerPlugin
};

/**
 * Activate all the components in the Media Player package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
  // Register the MediaPlayerPlugin as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab
  //   - Database.Tab
  //   - Collection.Tab
  //   - CollectionHUD.Item
  //   - Header.Item

  appRegistry.registerRole('Collection.Tab', ROLE);
  appRegistry.registerAction('MediaPlayer.Actions', MediaPlayerActions);
  appRegistry.registerStore('MediaPlayer.Store', MediaPlayerStore);
}

/**
 * Deactivate all the components in the Media Player package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterRole('Collection.Tab', ROLE);
  appRegistry.deregisterAction('MediaPlayer.Actions');
  appRegistry.deregisterStore('MediaPlayer.Store');
}

export default MediaPlayerPlugin;
export { activate, deactivate };
