realm.subscriptions.update((mutableSubs) => {
  // remove a subscription with a specific query
  mutableSubs.remove(tasks.filtered('owner == "Ben"'));
});
