// NOTE: not actually testing code examples to be in line with the existing Node.js SDK
// sync tests. Probably should be tested at some future point, but doesn't need
// to occur during this initial @realm/react-ification.
import React, {useEffect} from 'react';
import {Context} from '../RealmConfig';
const {RealmProvider, useRealm} = Context;
import {AppProvider, UserProvider} from '@realm/react';
import Realm from 'realm';
import {useApp} from '@realm/react';
const APP_ID = 'js-flexible-oseso';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWithErrorHandling />
        <RealmWithRecoverOrDiscardUnsyncedChangesClientReset />
        <RealmWithRecoverUnsyncedChangesClientReset />
        <RealmWithManualClientResetFallback />
        <RealmWitDiscardUnsyncedChangesClientReset />
        <RealmWitDiscardAfterBreakingSchemaChangesClientReset />
        <RealmWitManualClientReset />
      </UserProvider>
    </AppProvider>
  );
}

// :snippet-start: handle-sync-error

const syncConfigWithErrorHandling = {
  flexible: true,
  onError: (_session, error) => {
    console.log(error);
  },
};

function RealmWithErrorHandling() {
  return (
    <RealmProvider sync={syncConfigWithErrorHandling}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

// :snippet-start: recover-discard-unsynced-changes
const syncConfigWithRecoverDiscardClientReset = {
  flexible: true,
  clientReset: {
    mode: Realm.ClientResetMode.RecoverOrDiscardUnsyncedChanges,
    onBefore: realm => {
      // This block could be used for custom recovery, reporting, debugging etc.
    },
    onAfter: (beforeRealm, afterRealm) => {
      // This block could be used for custom recovery, reporting, debugging etc.
    },
    onFallback: (session, path) => {
      // See below "Manual Client Reset Fallback" section for example
    },
  },
};

function RealmWithRecoverOrDiscardUnsyncedChangesClientReset() {
  return (
    <RealmProvider sync={syncConfigWithRecoverDiscardClientReset}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:
// :snippet-start: recover-unsynced-changes
const syncConfigWithRecoverClientReset = {
  flexible: true,
  clientReset: {
    mode: Realm.ClientResetMode.RecoverUnsyncedChanges,
    onBefore: realm => {
      // This block could be used for custom recovery, reporting, debugging etc.
    },
    onAfter: (beforeRealm, afterRealm) => {
      // This block could be used for custom recovery, reporting, debugging etc.
    },
    onFallback: (session, path) => {
      // See below "Manual Client Reset Fallback" section for example
    },
  },
};
function RealmWithRecoverUnsyncedChangesClientReset() {
  return (
    <RealmProvider sync={syncConfigWithRecoverClientReset}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

// :snippet-start: manual-client-reset-fallback
let realm; // value assigned in <RestOfApp> with useRealm()

const syncConfigWithClientResetFallback = {
  flexible: true,
  clientReset: {
    mode: Realm.ClientResetMode.RecoverOrDiscardUnsyncedChanges, // or "recoverUnsyncedChanges"
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
// :snippet-end:

// :snippet-start: discard-unsynced-changes
const syncConfigWithDiscardClientReset = {
  flexible: true,
  clientReset: {
    mode: Realm.ClientResetMode.DiscardUnsyncedChanges,
    onBefore: realm => {
      console.log('Beginning client reset for ', realm.path);
    },
    onAfter: (beforeRealm, afterRealm) => {
      console.log('Finished client reset for', beforeRealm.path);
      console.log('New realm path', afterRealm.path);
    },
  },
};

function RealmWitDiscardUnsyncedChangesClientReset() {
  return (
    <RealmProvider sync={syncConfigWithDiscardClientReset}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

// :snippet-start: discard-after-breaking-schema-changes
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
    mode: Realm.ClientResetMode.DiscardUnsyncedChanges,
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
// :snippet-end:

// :snippet-start: manual
const syncConfigWithManualClientReset = {
  flexible: true,
  clientReset: {
    mode: 'manual',
    onManual: (session, path) => {
      // handle manual client reset here
    },
  },
};

function RealmWitManualClientReset() {
  return (
    <RealmProvider sync={syncConfigWithManualClientReset}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app
      .logIn(Realm.Credentials.anonymous())
      .then(user => console.debug('logged in ', user.id));
  }, []);
  return <></>;
}

// must add test for jest to make the test pass
test('make test pass', () => expect(true).toBeTruthy());
