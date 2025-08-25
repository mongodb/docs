class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      _id: 'string',
      firstName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // Increment the 'schemaVersion', since 'lastName' has been removed from the schema.
  // The initial schemaVersion is 0.
  schemaVersion: 1,
};

// pass the configuration object with the updated 'schemaVersion' to createRealmContext()
const {RealmProvider} = createRealmContext(config);
