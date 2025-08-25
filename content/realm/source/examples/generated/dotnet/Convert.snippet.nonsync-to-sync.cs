var existingConfig = new RealmConfiguration("example.realm");
var existingRealm = Realm.GetInstance(existingConfig);

var app = App.Create("my-app-id");
var user = await app.LogInAsync(
    Credentials.EmailPassword("email@example.com", "password"));
var syncConfig = new PartitionSyncConfiguration("user_partition", user);

existingRealm.WriteCopy(syncConfig);

// You can now delete the nonsynced realm:
Realm.DeleteRealm(existingConfig);

// You can now use the synced realm:
var syncedRealm = Realm.GetInstance(syncConfig);
