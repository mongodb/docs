class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      // update the data type of '_id' to be 'objectId' within the schema
      _id: 'objectId',
      firstName: 'string',
      lastName: 'string',
    },
  };
}

const config = {
  schema: [Person],
  // Increment the 'schemaVersion', since the property type of '_id'
  // has been modified.
  // The initial schemaVersion is 0.
  schemaVersion: 1,
  onMigration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects(Person);
      const newObjects = newRealm.objects(Person);
      // loop through all objects and set the _id property
      // in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }
    }
  },
};

// Pass the configuration object with the updated
// 'schemaVersion' and 'migration' function to createRealmContext()
const {RealmProvider} = createRealmContext(config);
