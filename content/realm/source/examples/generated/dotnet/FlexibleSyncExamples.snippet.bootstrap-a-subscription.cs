var config = new FlexibleSyncConfiguration(app.CurrentUser)
{
    PopulateInitialSubscriptions = (realm) =>
    {
        var myItems = realm.All<Item>().Where(n => n.OwnerId == myUserId);
        realm.Subscriptions.Add(myItems);
    }
};

// The process will complete when all the user's items have been downloaded.
var realm = await Realm.GetInstanceAsync(config);
