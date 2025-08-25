let realm; // value assigned in <RestOfApp> with useRealm()

const syncConfigWithClientResetFallback = {
  flexible: true,
  clientReset: {
    mode: 'recoverOrDiscardUnsyncedChanges', // or "recoverUnsyncedChanges"
    // can also include `onBefore` and `onAfter` callbacks
    onFallback: (_session, path) => {
      try {
        // Prompt user to perform a client reset immediately. If they don't,
        // they won't receive any data from the server until they restart the app
        // and all changes they make will be discarded when the app restarts.
        const didUserConfirmReset = showUserAConfirmationDialog();
        if (didUserConfirmReset) {
          // Close and delete old realm from device
          realm.close();
          Realm.deleteFile(path);
          // Perform client reset
          Realm.App.Sync.initiateClientReset(app, path);
          // Navigate the user back to the main page or reopen the
          // the Realm and reinitialize the current page
        }
      } catch (err) {
        // Reset failed. Notify user that they'll need to
        // update the app
      }
    },
  },
};

function RealmWithManualClientResetFallback() {
  return (
    <RealmProvider sync={syncConfigWithClientResetFallback}>
      <RestOfApp />
    </RealmProvider>
  );
}

function RestOfApp() {
  // Assigning variable defined above to a realm.
  realm = useRealm();

  return <>{/* Other components in rest of app */}</>;
}
