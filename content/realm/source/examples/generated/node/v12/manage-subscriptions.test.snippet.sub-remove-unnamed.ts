// Remove unnamed subscriptions.
let numberRemovedSubscriptions = 0;
await realm.subscriptions.update((mutableSubs) => {
  numberRemovedSubscriptions = mutableSubs.removeUnnamed();
});
