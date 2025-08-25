final sub = realm.subscriptions[0];
realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
  mutableSubscriptions.remove(sub);
});
