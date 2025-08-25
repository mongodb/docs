// Once you have opened your Realm, you will have to keep a reference to it.
// In the error handler, this reference is called `realm`
async function handleSyncError(session, syncError) {
  if (syncError.name == 'ClientReset') {
    console.log(syncError);
    try {
      console.log('error type is ClientReset....');
      const path = realm.path; // realm.path will not be accessible after realm.close()
      realm.close();
      Realm.App.Sync.initiateClientReset(app, path);
      // Download Realm from the server.
      // Ensure that the backend state is fully downloaded before proceeding,
      // which is the default behavior.
      realm = await Realm.open(config);
      realm.close();
    } catch (err) {
      console.error(err);
    }
  } else {
    // ...handle other error types
  }
}

const syncConfigWithDiscardAfterBreakingSchemaChanges = {
  flexible: true,
  clientReset: {
    mode: 'discardUnsyncedChanges',
    onBefore: realm => {
      // NOT used with destructive schema changes
      console.log('Beginning client reset for ', realm.path);
    },
    onAfter: (beforeRealm, afterRealm) => {
      // Destructive schema changes do not hit this function.
      // Instead, they go through the error handler.
      console.log('Finished client reset for', beforeRealm.path);
      console.log('New realm path', afterRealm.path);
    },
  },
  onError: handleSyncError, // invoked with destructive schema changes
};

function RealmWitDiscardAfterBreakingSchemaChangesClientReset() {
  return (
    <RealmProvider sync={syncConfigWithDiscardAfterBreakingSchemaChanges}>
      <RestOfApp />
    </RealmProvider>
  );
}
