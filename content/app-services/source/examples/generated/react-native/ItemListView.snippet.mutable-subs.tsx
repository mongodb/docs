useEffect(() => {
  if (showAllItems) {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.removeByName(ownItemsSubscriptionName);
      mutableSubs.add(realm.objects(Item), {name: itemSubscriptionName});
    });
  } else if (showImportantOnly) {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.removeByName(itemSubscriptionName);
      mutableSubs.add(
        realm.objects(Item).filtered(`owner_id == "${user?.id}" && priority <= 1`),
        {name: ownItemsSubscriptionName},
      );
    });
  } else {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.removeByName(itemSubscriptionName);
      mutableSubs.add(
        realm.objects(Item).filtered(`owner_id == "${user?.id}"`),
        {name: ownItemsSubscriptionName},
      );
    });
  }
}, [realm, user, showAllItems, showImportantOnly]);
