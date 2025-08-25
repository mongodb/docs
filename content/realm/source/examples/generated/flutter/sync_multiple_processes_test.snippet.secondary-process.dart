// Same realm file location as primary process
final sameRealmPath =
    path.join(Configuration.defaultStoragePath, 'synced.realm');

final disconnectedSyncConfig =
    Configuration.disconnectedSync(schema, path: sameRealmPath);
final realmWithDisconnectedSync = Realm(disconnectedSyncConfig);
