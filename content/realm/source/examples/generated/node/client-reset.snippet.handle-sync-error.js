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
