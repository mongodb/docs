final longerTrainQuery = realm.query<Train>("numCars > 10");

realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
  mutableSubscriptions.add(longerTrainQuery,
      name: 'long-trains', update: true);
});
