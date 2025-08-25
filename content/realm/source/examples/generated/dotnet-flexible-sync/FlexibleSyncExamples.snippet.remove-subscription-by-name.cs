realm.Subscriptions.Update(() =>
{
    // remove a named subscription
    var subscriptionName = "longRunningTasksSubscription";
    realm.Subscriptions.Remove(subscriptionName);
});
