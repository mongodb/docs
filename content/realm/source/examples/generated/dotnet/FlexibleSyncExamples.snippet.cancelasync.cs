var config = new FlexibleSyncConfiguration(app.CurrentUser!)
{
    CancelAsyncOperationsOnNonFatalErrors = true,
};

// These operations will throw an exception
// on timeout or other transient sync session errors.
var realm = await Realm.GetInstanceAsync(config);

var session = realm.SyncSession;
await session.WaitForUploadAsync();
await session.WaitForDownloadAsync();
