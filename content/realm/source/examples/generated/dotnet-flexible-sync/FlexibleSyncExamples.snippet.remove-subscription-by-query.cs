realm.Subscriptions.Update(() =>
{
    // remove a subscription by it's query
    var query = realm.All<Task>().Where(t => t.Owner == "Ben");
    realm.Subscriptions.Remove(query);
});
