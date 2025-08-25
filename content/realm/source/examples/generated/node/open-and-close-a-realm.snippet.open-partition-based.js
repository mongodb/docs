const config = {
  schema: [Car],
  sync: {
    user: app.currentUser,
    partitionValue: "myPartition",
  },
};

const realm = await Realm.open(config);
