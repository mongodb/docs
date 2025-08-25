const behaviorConfiguration = {
  type: "openImmediately",
};

const config = {
  schema: [Car],
  sync: {
    user: await getUser(),
    flexible: true,
    newRealmFileBehavior: behaviorConfiguration,
    existingRealmFileBehavior: behaviorConfiguration,
  },
};

const realm = await Realm.open(config);
