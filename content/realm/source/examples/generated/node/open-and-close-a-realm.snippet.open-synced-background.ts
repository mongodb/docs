const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
  type: "openImmediately",
};

const config: Realm.Configuration = {
  schema: [Car],
  sync: {
    user: await getUser(),
    flexible: true,
    newRealmFileBehavior: behaviorConfiguration,
    existingRealmFileBehavior: behaviorConfiguration,
  },
};

const realm = await Realm.open(config);
