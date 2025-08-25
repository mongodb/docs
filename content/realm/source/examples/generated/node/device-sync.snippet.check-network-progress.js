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

const handleNotifcationRemoval = (transferred, transferable) => {
  console.log(`There were ${transferable} transferable bytes total.`);
  console.log(`${transferred} bytes were transferred.`);
};
const handleNotifications = (transferred, transferable) => {
  if (transferred === transferable) {
    console.log(
      `${transferred} bytes of ${transferable} were transferred.`
    );

    // Remove progress notification.
    realm.syncSession?.removeProgressNotification(handleNotifcationRemoval);
  }
};

realm.syncSession?.addProgressNotification(
  "upload",
  "reportIndefinitely",
  handleNotifications
);

// Upload a Realm object.
const dog = realm.write(() => {
  return realm.create("Dog", {
    _id: new Realm.BSON.ObjectID(),
    MyPartitionValue: "MyPartitionValue",
    name: "Fido",
    age: 2,
  });
});
