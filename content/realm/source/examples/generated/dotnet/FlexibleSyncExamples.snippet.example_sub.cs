realm.Subscriptions.Update(() =>
{
    var completedItemsQuery = realm
        .All<MyTask>()
        .Where(i => i.Status == "completed");
    realm.Subscriptions
        .Add(completedItemsQuery,
            new SubscriptionOptions() { Name = "completedItems" });
});
