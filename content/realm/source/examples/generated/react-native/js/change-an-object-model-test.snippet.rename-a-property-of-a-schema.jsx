class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      _id: 'string',
      // rename the 'firstName' and 'lastName' property, to 'fullName'
      // in the schema
      fullName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // Increment the 'schemaVersion', since 'fullName' has replaced
  // 'firstName' and 'lastName' in the schema.
  // The initial schemaVersion is 0.
  schemaVersion: 1,
  onMigration: (oldRealm, newRealm) => {
    // only apply this change if upgrading schemaVersion
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects(Person);
      const newObjects = newRealm.objects(Person);
      // loop through all objects and set the fullName property in the
      // new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
      }
    }
  },
};

// pass the configuration object with the updated 'schemaVersion' and
// 'migration' function to createRealmContext()
const {RealmProvider} = createRealmContext(config);
