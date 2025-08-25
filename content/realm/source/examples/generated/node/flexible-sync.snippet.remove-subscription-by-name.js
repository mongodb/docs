realm.subscriptions.update((mutableSubs) => {
  // remove a subscription with a specific name
  mutableSubs.removeByName("longRunningTasksSubscription");
});
