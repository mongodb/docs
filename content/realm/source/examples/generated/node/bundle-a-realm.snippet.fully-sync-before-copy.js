const config = {
  sync: {
    user: app.currentUser,
    partitionValue: app.currentUser.id,
  },
  schema: [Car],
};
const realm = await Realm.open(config);

// create many changes
realm.write(() => {
  for (let i = 0; i < 25; i++) {
    realm.create("Car", {
      make: "Toyota",
      model: "Prius",
      miles: i,
      owner: app.currentUser.id,
    });
  }
});

// ensure synchronize all changes before copy
await realm.syncSession.uploadAllLocalChanges();
await realm.syncSession.downloadAllServerChanges();

// changes are synchronized -- we can copy the realm
realm.writeCopyTo(__dirname + "syncedCopy.realm");
