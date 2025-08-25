const config: Realm.Configuration = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser!,
    partitionValue: "MyPartitionValue",
  },
};

const realm = await Realm.open(config);

const connectionState = realm.syncSession?.connectionState;
