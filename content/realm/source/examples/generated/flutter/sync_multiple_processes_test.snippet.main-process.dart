// Same realm file location as secondary process
final realmPath =
    path.join(Configuration.defaultStoragePath, 'synced.realm');

final flexibleConfig =
    Configuration.flexibleSync(currentUser, schema, path: realmPath);
final realmWithSync = Realm(flexibleConfig);
