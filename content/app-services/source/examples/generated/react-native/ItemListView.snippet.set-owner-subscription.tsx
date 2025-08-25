realm.subscriptions.update(mutableSubs => {
  mutableSubs.removeByName(itemSubscriptionName);
  mutableSubs.add(
    realm.objects(Item).filtered(`owner_id == "${user?.id}"`),
    {name: ownItemsSubscriptionName},
  );
});
