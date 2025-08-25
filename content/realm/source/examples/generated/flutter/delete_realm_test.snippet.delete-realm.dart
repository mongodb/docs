//Get realm's file path
final path = realm.config.path;

// You must close a realm before deleting it
realm.close();

// Delete the realm
Realm.deleteRealm(path);
