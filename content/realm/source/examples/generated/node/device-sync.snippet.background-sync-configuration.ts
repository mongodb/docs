const config: Realm.Configuration = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser!,
    partitionValue: "MyPartitionValue",
    // The behavior to use when this is the first time opening a realm.
    newRealmFileBehavior: behaviorConfiguration,
    // The behavior to use when a realm file already exists locally,
    // i.e. you have previously opened the realm.
    existingRealmFileBehavior: behaviorConfiguration,
  },
};
