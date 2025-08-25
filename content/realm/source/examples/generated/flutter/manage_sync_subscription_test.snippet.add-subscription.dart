final planeQuery = realm.all<Plane>();
final longTrainQuery = realm.query<Train>("numCars >= 5");
realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
  mutableSubscriptions.add(planeQuery, name: "planes");
  mutableSubscriptions.add(longTrainQuery,
      name: 'long-trains', update: true);
});
await realm.subscriptions.waitForSynchronization();
