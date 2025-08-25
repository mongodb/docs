const behaviorConfiguration = {
  type: "openImmediately",
};

const config = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    newRealmFileBehavior: behaviorConfiguration,
    existingRealmFileBehavior: behaviorConfiguration,
  },
};

const realm = await Realm.open(config);

const pauseSyncSession = () => {
  realm.syncSession?.pause();
};

const resumeSyncSession = () => {
  realm.syncSession?.resume();
};
