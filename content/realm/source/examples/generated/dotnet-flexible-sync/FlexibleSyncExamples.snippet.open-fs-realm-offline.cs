var app = App.Create("myRealmAppId");
Realms.Sync.User user;
FlexibleSyncConfiguration config;
Realm realm;

if (app.CurrentUser == null)
{
    // App must be online for user to authenticate
    user = await app.LogInAsync(Credentials.Anonymous());
    config = new FlexibleSyncConfiguration(user);
    realm = Realm.GetInstance(config);
    // Go on to add or update subscriptions and use the realm
}
else 
{
    // This works whether online or offline
    // It requires a user to have been previously authenticated
    user = app.CurrentUser;
    config = new FlexibleSyncConfiguration(user);
    realm = Realm.GetInstance(config);
    // Go on to add or update subscriptions and use the realm
}
