realm.Subscriptions.Update(() =>
{
    // remove a subscription by it's query
    var query = realm.All<Item>().Where(i => i.Owner == "Ben");
    realm.Subscriptions.Remove(query);
});
