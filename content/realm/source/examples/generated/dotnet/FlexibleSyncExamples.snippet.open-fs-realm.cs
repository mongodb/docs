
var config = new FlexibleSyncConfiguration(user)
{
    PopulateInitialSubscriptions = (realm) =>
    {
        var allItems = realm.All<Item>();
        realm.Subscriptions.Add(allItems, new SubscriptionOptions { Name = "allItems" });
    }
};
try
{
    realm = await Realm.GetInstanceAsync(config);
}
catch (Exception ex)
{
    Console.WriteLine($@"Error creating or opening the
        realm file. {ex.Message}");
}
