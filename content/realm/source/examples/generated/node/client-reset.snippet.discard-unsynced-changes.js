const config = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser,
    flexible: true,
    clientReset: {
      mode: "discardUnsyncedChanges",
      onBefore: (realm) => {
        console.log("Beginning client reset for ", realm.path);
      },
      onAfter: (beforeRealm, afterRealm) => {
        console.log("Finished client reset for", beforeRealm.path);
        console.log("New realm path", afterRealm.path);
      },
    },
  },
};
