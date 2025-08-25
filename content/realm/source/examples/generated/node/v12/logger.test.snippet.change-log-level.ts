// Set a default log level that's not too verbose
Realm.setLogLevel("detail");
const realm = await Realm.open({
  schema: [Turtle],
});

// Later, change the log level to debug an issue when running specific code
Realm.setLogLevel("trace");
realm.write(() => realm.create(Turtle, newTestObject()));
