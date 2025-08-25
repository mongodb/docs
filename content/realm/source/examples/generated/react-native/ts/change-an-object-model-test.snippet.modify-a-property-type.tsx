class Person extends Realm.Object<Person> {
  _id!: Realm.BSON.ObjectId;
  firstName!: string;
  lastName!: string;
  age!: number;

  static schema: ObjectSchema = {
    name: 'Person',
    properties: {
      // Update the data type of '_id' to be 'objectId' within the schema.
      _id: 'objectId',
      firstName: 'string',
      lastName: 'string',
    },
  };
}

// `OldObjectModel` is only used for type injection for `oldRealm`. It is
// not related to the `Person` object model.
interface OldObjectModel {
  _id: Realm.BSON.ObjectId;
  firstName: string;
  lastName: string;
  age: number;
}

const config: Realm.Configuration = {
  schema: [Person],
  // Increment the 'schemaVersion', since the property type of '_id'
  // has been modified.
  // The initial schemaVersion is 0.
  schemaVersion: 1,
  onMigration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjects: Realm.Results<OldObjectModel> =
        oldRealm.objects(Person);
      const newObjects: Realm.Results<Person> = newRealm.objects(Person);
      // Loop through all objects and set the _id property
      // in the new schema.
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }
    }
  },
};

// Pass the configuration object with the updated
// 'schemaVersion' and 'migration' function to createRealmContext().
const {RealmProvider} = createRealmContext(config);
