// Configure and open the realm
final config = Configuration.flexibleSync(user, [Car.schema]);
final realm = Realm(config);

// Add subscription to sync all Car objects in the realm
realm.subscriptions.update((mutableSubscriptions) {
  mutableSubscriptions.add(realm.all<Car>());
});
// Sync all subscriptions
await realm.subscriptions.waitForSynchronization();
