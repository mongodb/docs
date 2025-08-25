realm.write(() => {
  realm.create(Doggie, {
    _id: new BSON.ObjectID(),
    owner_id: app.currentUser!.id,
    name: "Maui",
    age: 3,
  });
});

await realm.syncSession?.uploadAllLocalChanges();
