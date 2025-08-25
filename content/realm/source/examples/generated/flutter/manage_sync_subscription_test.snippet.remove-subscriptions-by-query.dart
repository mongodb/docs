realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
  mutableSubscriptions.removeByQuery(realm.all<Plane>());
});
