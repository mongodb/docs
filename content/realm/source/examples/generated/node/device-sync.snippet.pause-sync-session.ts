const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
};

const config: Realm.Configuration = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser!,
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
