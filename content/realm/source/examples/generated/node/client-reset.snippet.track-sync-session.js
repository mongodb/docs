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
