
// open an existing realm
var existingConfig = new PartitionSyncConfiguration("myPartition", user);
var realm = await Realm.GetInstanceAsync(existingConfig);

// Create a RealmConfiguration for the *copy*
// Be sure the partition name matches the original
var bundledConfig = new PartitionSyncConfiguration("myPartition", user, "bundled.realm");

// Make sure the file doesn't already exist
Realm.DeleteRealm(bundledConfig);

// IMPORTANT: When copying a Synced realm, you must ensure
// that there are no pending Sync operations. You do this
// by calling WaitForUploadAsync() and WaitForDownloadAsync():
var session = realm.SyncSession;
await session.WaitForUploadAsync();
await session.WaitForDownloadAsync();

// Copy the realm
realm.WriteCopy(bundledConfig);

// Want to know where the copy is?
var locationOfCopy = existingConfig.DatabasePath;
