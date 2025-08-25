realm.Subscriptions.Update(() =>
{
    // Subscribe to all long running items, and name
    // the subscription "longRunningItems"
    var longRunningTasksQuery = realm.All<Item>()
        .Where(t => t.ProgressMinutes > 120);
    realm.Subscriptions.Add(longRunningTasksQuery,
        new SubscriptionOptions() { Name = "longRunningItems" });

    // Subscribe to all of Ben's Items
    realm.Subscriptions.Add(realm.All<Item>()
        .Where(t => t.Owner == "Ben"));

    // Subscribe to all Teams, name the subscription
    // 'teamsSubscription', and throw an error if
    // this subscription name already exists.
    realm.Subscriptions.Add(realm.All<Team>(),
        new SubscriptionOptions()
        { Name = "teams", UpdateExisting = false });
});
