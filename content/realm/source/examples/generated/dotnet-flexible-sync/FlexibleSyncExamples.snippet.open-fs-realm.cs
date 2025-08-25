var app = App.Create("myRealmAppId");
var user = await app.LogInAsync(Credentials.Anonymous());
Realm realm;

var config = new FlexibleSyncConfiguration(user)
{
    PopulateInitialSubscriptions = (realm) =>
    {
        var allTasks = realm.All<MyTask>();
        realm.Subscriptions.Add(allTasks, new SubscriptionOptions { Name = "allTasks" });
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
