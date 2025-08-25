print("Bundling synced realm");

// You must connect to the Device Sync server with an authenticated
// user to work with the synced realm.
final app = App(AppConfiguration(APP_ID));
// Check if current user exists and log anonymous user if not.
final user = app.currentUser ?? await app.logIn(Credentials.anonymous());

final config = Configuration.flexibleSync(user, [Car.schema]);
final realm = Realm(config);

// Add subscription that match the data being added
// and your app's backend permissions.
realm.subscriptions.update((mutableSubscriptions) {
  mutableSubscriptions.add(realm.all<Car>());
});
await realm.subscriptions.waitForSynchronization();

// Add data to realm
realm.write(() {
  realm.add(Car(ObjectId(), "Audi", model: 'A8'));
  realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
});

// Sync changes with the server
await realm.syncSession.waitForUpload();
await realm.syncSession.waitForDownload();

// Create new configuration for the bundled realm.
// You must specify a path separate from the realm you
// are copying for Realm.writeCopy() to succeed.
final bundledConfig = Configuration.flexibleSync(user, [Car.schema],
    path: 'sync_bundle.realm');
realm.writeCopy(bundledConfig);

print("Bundled realm location: " + bundledConfig.path);
realm.close();
