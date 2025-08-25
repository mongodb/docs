realm.Subscriptions.Update(() =>
{
    // remove a named subscription
    var subscriptionName = "longRunningItemsSubscription";
    realm.Subscriptions.Remove(subscriptionName);
});
