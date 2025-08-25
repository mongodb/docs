const config: Realm.Configuration = {
  schema: [Car],
  sync: {
    user: app.currentUser!,
    partitionValue: "myPartition",
  },
};

const realm = await Realm.open(config);
