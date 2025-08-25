import Realm from "realm";
import { ObjectId } from "bson";

const REALM_APP_ID = "myapp-zufnj";

let realm;
let app;
beforeEach(async () => {
  app = new Realm.App({ id: REALM_APP_ID });
  await app.logIn(new Realm.Credentials.anonymous());
});
afterEach(async () => {
  if (realm && !realm.isClosed) {
    realm.write(() => {
      realm.deleteAll();
    });
    const path = realm.path;
    realm.close();
    Realm.deleteFile({ path });
    await app?.currentUser?.logOut();
  }
});
describe.skip("Client Reset with Seamless Loss", () => {
  // these tests can take longer than most, causing timeouts that make
  // the Github Actions CI fail
  jest.setTimeout(20000);

  const DogSchema = {
    name: "Doggo3",
    properties: {
      _id: "objectId",
      name: "string",
      age: "int?",
    },
    primaryKey: "_id",
  };
  test("Discard unsynced changes", async () => {
    let beforeCalled = false;
    let afterCalled = false;
    const clientResetSuccess = await new Promise((resolve, reject) => {
      // :snippet-start: discard-unsynced-changes
      const config = {
        schema: [DogSchema],
        sync: {
          user: app.currentUser,
          flexible: true,
          clientReset: {
            mode: "discardUnsyncedChanges",
            onBefore: (realm) => {
              console.log("Beginning client reset for ", realm.path);
              // :remove-start:
              beforeCalled = true;
              // :remove-end:
            },
            onAfter: (beforeRealm, afterRealm) => {
              console.log("Finished client reset for", beforeRealm.path);
              console.log("New realm path", afterRealm.path);
              // :remove-start:
              afterCalled = true;
              resolve(beforeCalled && afterCalled);
              // :remove-end:
            },
          },
        },
      };
      // :snippet-end:
      Realm.open(config).then((openedRealm) => {
        realm = openedRealm;
        realm.write(() => {
          realm.create("Doggo3", {
            _id: new ObjectId(),
            name: "Chippy",
            age: 12,
          });
          realm.create("Doggo3", {
            _id: new ObjectId(),
            name: "Jasper",
            age: 11,
          });
        });
        realm.syncSession._simulateError(
          211,
          "Simulate Client Reset",
          "realm::sync::ProtocolError",
          false
        );
      });
    });
    expect(clientResetSuccess).toBe(true);
  });

  test.skip("Recover Unsynced Changes Mode", async () => {
    // :snippet-start: recover-unsynced-changes
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
        clientReset: {
          mode: "recoverUnsyncedChanges",
          onBefore: (realm) => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onAfter: (beforeRealm, afterRealm) => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onFallback: (session, path) => {
            // See below "Manual Client Reset Fallback" section for example
          },
        },
      },
    };
    // :snippet-end:
  });

  // TODO(DOCSP-23425): investigate real example once sdk changes merged
  test.skip("Recover or Discard Unsynced Changes Mode", async () => {
    // :snippet-start: recover-or-discard-unsynced-changes
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
        clientReset: {
          mode: "recoverOrDiscardUnsyncedChanges",
          onBefore: (realm) => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onAfter: (beforeRealm, afterRealm) => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onFallback: (session, path) => {
            // See below "Manual Client Reset Fallback" section for example
          },
        },
      },
    };
    // :snippet-end:
  });

  test.skip("Client reset with recovery fallback", async () => {
    function showUserAConfirmationDialog() {
      return true;
    }
    // :snippet-start: recovery-fallback
    // Must define `realm` at higher scope than `config` so it's accessible
    // from the `onFallback` callback
    // :uncomment-start:
    // let realm;
    // :uncomment-end:

    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
        clientReset: {
          mode: "recoverOrDiscardUnsyncedChanges", // or "recoverUnsyncedChanges"
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
      },
    };

    realm = await Realm.open(config);
    // :snippet-end:
  });

  // skipping because there's no way to manually trigger breaking schema changes
  // client reset from `realm.syncSession._simulateError`. error code `211` should have
  // worked to trigger client reset w breaking schema changes but didn't.
  // this is a known issue being investigated by the JS team.
  // once there is a way to trigger client reset w breaking schema changes from
  // the test, this test will probably have to be refactored slightly to make work.
  test.skip("Discard unsynced changes after breaking schema changes", async () => {
    const DogSchema = {
      name: "Doggo4",
      properties: {
        _id: "objectId",
        name: "string",
        age: "int?",
      },
      primaryKey: "_id",
    };
    const clientResetSuccess = await new Promise((resolve, reject) => {
      // :snippet-start: discard-unsynced-changes-after-destructive-schema-changes
      // Once you have opened your Realm, you will have to keep a reference to it.
      // In the error handler, this reference is called `realm`
      async function handleSyncError(session, syncError) {
        if (syncError.name == "ClientReset") {
          console.log(syncError);
          try {
            console.log("error type is ClientReset....");
            const path = realm.path; // realm.path will not be accessible after realm.close()
            realm.close();
            Realm.App.Sync.initiateClientReset(app, path);

            // Download Realm from the server.
            // Ensure that the backend state is fully downloaded before proceeding,
            // which is the default behavior.
            realm = await Realm.open(config);
            // :remove-start:
            expect(realm.isClosed).toBe(false);
            resolve(true);
            // :remove-end:
            realm.close();
          } catch (err) {
            console.error(err);
            reject(err); // :remove:
          }
        } else {
          // ...handle other error types
          // :remove-start:
          console.log(syncError);
          reject("not a client reset error :(");
          // :remove-end:
        }
      }

      const config = {
        schema: [DogSchema],
        sync: {
          user: app.currentUser,
          flexible: true,
          clientReset: {
            mode: "discardUnsyncedChanges",
            onBefore: (realm) => {
              // NOT used with destructive schema changes
              console.log("Beginning client reset for ", realm.path);
              // :remove-start:
              reject(
                "Test shouldn't touch automatic client reset logic (before)"
              );
              // :remove-end:
            },
            onAfter: (beforeRealm, afterRealm) => {
              // Destructive schema changes do not hit this function.
              // Instead, they go through the error handler.
              console.log("Finished client reset for", beforeRealm.path);
              console.log("New realm path", afterRealm.path);
              // :remove-start:
              reject(
                "Test shouldn't touch automatic client reset logic (after)"
              );
              // :remove-end:
            },
          },
          onError: handleSyncError, // invoked with destructive schema changes
        },
      };
      // :snippet-end:
      Realm.open(config).then((openedRealm) => {
        realm = openedRealm;
        realm.write(() => {
          realm.create("Doggo3", {
            _id: new ObjectId(),
            name: "Maggie",
            age: 13,
          });
        });
        realm.syncSession._simulateError(
          211,
          "Simulate Client Reset",
          "realm::sync::ProtocolError",
          true
        );
      });
    });
    expect(clientResetSuccess).toBe(true);
  });
});

describe("Manual client reset", () => {
  // :snippet-start: track-updates-to-objects
  const DogSchema = {
    name: "Dog",
    properties: {
      name: "string",
      age: "int?",
      lastUpdated: "int",
    },
  };

  // :snippet-end:
  test.skip("Manual client reset - onManual handler", async () => {
    // :snippet-start: manual-client-reset-onmanual
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
        clientReset: {
          mode: "manual",
          onManual: (session, path) => {
            // handle manual client reset here
          },
        },
      },
    };
    // :snippet-end:
  });
  test.skip("Manually recover unsynced changes", async () => {
    // :snippet-start: config
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        clientReset: {
          mode: "manual",
        },
        error: handleSyncError, // callback function defined later
      },
    };
    // :snippet-end:
    const app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
    let realm = await Realm.open(config);
    // :snippet-start: last-synced-realm
    const LastSyncedSchema = {
      name: "LastSynced",
      properties: {
        realmTracked: "string",
        timestamp: "int?",
      },
      primaryKey: "realmTracked",
    };
    const lastSyncedConfig = { schema: [LastSyncedSchema] };
    const lastSyncedRealm = await Realm.open(lastSyncedConfig);
    lastSyncedRealm.write(() => {
      lastSyncedRealm.create("LastSynced", {
        realmTracked: "Dog",
      });
    });
    // :snippet-end:
    // :snippet-start: track-sync-session
    // Listens for changes to the Dogs collection
    realm.objects("Dog").addListener(async () => {
      // only update LastSynced if sync session is connected
      // and all local changes are synced
      if (realm.syncSession.isConnected()) {
        await realm.syncSession.uploadAllLocalChanges();
        lastSyncedRealm.write(() => {
          lastSyncedRealm.create("LastSynced", {
            realmTracked: "Dog",
            timestamp: Date.now(),
          });
        });
      }
    });
    // :snippet-end:
    // :snippet-start: handle-sync-error
    async function handleSyncError(_session, error) {
      if (error.name === "ClientReset") {
        const realmPath = realm.path; // realm.path will not be accessible after realm.close()
        realm.close(); // you must close all realms before proceeding

        // pass your realm app instance and realm path to initiateClientReset()
        Realm.App.Sync.initiateClientReset(app, realmPath);

        // Redownload the realm
        realm = await Realm.open(config);
        const oldRealm = await Realm.open(error.config);

        const lastSyncedTime = lastSyncedRealm.objectForPrimaryKey(
          "LastSynced",
          "Dog"
        ).timestamp;
        const unsyncedDogs = oldRealm
          .objects("Dog")
          .filtered(`lastUpdated > ${lastSyncedTime}`);
        // add unsynced dogs to synced realm
        realm.write(() => {
          unsyncedDogs.forEach((dog) => {
            realm.create("Dog", dog, "modified");
          });
        });

        // delete dogs from synced realm that were deleted locally
        const syncedDogs = realm
          .objects("Dog")
          .filtered(`lastUpdated <= ${lastSyncedTime}`);
        realm.write(() => {
          syncedDogs.forEach((dog) => {
            if (!oldRealm.objectForPrimaryKey("Dog", dog._id)) {
              realm.delete(dog);
            }
          });
        });
        // make sure everything syncs and close old realm
        await realm.syncSession.uploadAllLocalChanges();
        oldRealm.close();
      } else {
        console.log(`Received error ${error.message}`);
      }
    }
    // :snippet-end:
  });
});
