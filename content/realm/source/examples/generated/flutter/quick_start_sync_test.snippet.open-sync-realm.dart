final config = Configuration.flexibleSync(loggedInUser, [Todo.schema]);
final realm = Realm(
  config,
);
