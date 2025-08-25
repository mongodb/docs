class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      _id: 'string',
      firstName: 'string',
      lastName: 'string',
      // add a new property, 'age' to the schema
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // Increment the 'schemaVersion', since 'age' has been added to the schema.
  // The initial schemaVersion is 0.
  schemaVersion: 2,
};

// pass the configuration object with the updated 'schemaVersion' to
// createRealmContext()
const {RealmProvider} = createRealmContext(config);
