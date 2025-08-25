using System;
using Realms;
using Realms.Sync;
using MongoDB.Bson;
using System.Linq;
using NUnit.Framework;
using System.Threading.Tasks;
using Realms.Exceptions.Sync;

namespace Examples
{
    public class Convert
    {
        public async Task TestNoSyncToSync()
        {
            // :snippet-start: nonsync-to-sync
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
            // :snippet-end:
        }

        public async Task TestSyncToNoSync()
        {
            // :snippet-start: sync-to-nosync

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
            // :snippet-end:
        }
    }
}