final app = App(AppConfiguration(APP_ID));
final user = await app.logIn(Credentials.anonymous());
final config = Configuration.flexibleSync(user, [Car.schema]);
final realm = Realm(config);

// Add subscriptions
realm.subscriptions.update((mutableSubscriptions) {
  // Get Cars from Atlas that match the Realm Query Language query.
  // Uses the queryable field `miles`.
  // Query matches cars with less than 100 miles or `null` miles.
  final newCarQuery = realm.query<Car>("miles < 100 OR miles == \$0", [null]);
  mutableSubscriptions.add(newCarQuery, name: "new-car-subscription");
});
await realm.subscriptions.waitForSynchronization();
