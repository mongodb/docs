const behaviorConfiguration = {
  type: "openImmediately",
  timeOut: 1000,
  timeOutBehavior: "openLocalRealm",
};

const config = {
  schema: [Car],
  sync: {
    flexible: true,
    user: await getUser(),
    existingRealmFileBehavior: behaviorConfiguration,
    newRealmFileBehavior: behaviorConfiguration,
  },
};

const realm = await Realm.open(config);
