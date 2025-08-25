// Lazily initialize `realm` so that it can be used in the callback
// before the realm has been opened.
late Realm realm;

final config = Configuration.flexibleSync(currentUser, schema,
    clientResetHandler: ManualRecoveryHandler((clientResetError) {
  // You must close the Realm before attempting the client reset.
  realm.close();
  // Handle manual client reset here...
  // Then perform the client reset.
  clientResetError.resetRealm();
}));
