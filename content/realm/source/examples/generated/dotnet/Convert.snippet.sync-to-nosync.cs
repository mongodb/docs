
// Open the existing sycned realm
var app = App.Create("my-app-id");
var user = await app.LogInAsync(
    Credentials.EmailPassword("email@example.com", "password"));

var syncedConfig = new FlexibleSyncConfiguration(user);
var syncedRealm = await Realm.GetInstanceAsync(syncedConfig);

// When copying a Synced realm, you must ensure
// that there are no pending Sync operations. You do this
// by calling WaitForUploadAsync() and WaitForDownloadAsync()
// methods:
var session = syncedRealm.SyncSession;
await session.WaitForUploadAsync();
await session.WaitForDownloadAsync();

var nonSyncConfig = new RealmConfiguration();

syncedRealm.WriteCopy(nonSyncConfig);

// You can now delete the synced realm:
Realm.DeleteRealm(syncedConfig);

// You can now use the nonsynced realm:
var nonSyncedRealm = Realm.GetInstance(nonSyncConfig);
