let subscriptionReference;
realm.subscriptions.update((mutableSubs) => {
  subscriptionReference = mutableSubs.add(realm.objects("Task"));
});
// later..
realm.subscriptions.removeSubscription(subscriptionReference);
