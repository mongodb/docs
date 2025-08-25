realm.subscriptions.update((mutableSubs) => {
  mutableSubs.removeByObjectType("Team");
});
