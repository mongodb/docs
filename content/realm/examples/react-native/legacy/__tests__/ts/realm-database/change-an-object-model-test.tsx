import React from 'react';
import {View, Text} from 'react-native';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';

// Replace incremented schema versions in Bluehawk output. The incrementing
// is necessary for testing, but confusing outside that context. Also remove
// useRealm instantiation, for the same reason.
// :replace-start: {
//    "terms": {
//       "schemaVersion: 3": "schemaVersion: 1",
//       "schemaVersion: 4": "schemaVersion: 1",
//       "schemaVersion: 5": "schemaVersion: 1",
//       "oldRealm.schemaVersion < 4": "oldRealm.schemaVersion < 1",
//       "oldRealm.schemaVersion < 5": "oldRealm.schemaVersion < 1",
//       "RealmProvider, useRealm": "RealmProvider"
//    }
// }

describe('Change an Object Model Tests', () => {
  class Person extends Realm.Object<Person> {
    _id!: string;
    firstName!: string;
    lastName!: string;
    age!: number;

    static schema: ObjectSchema = {
      name: 'Person',
      properties: {
        _id: 'string',
        firstName: 'string',
        lastName: 'string',
      },
    };
  }

  beforeEach(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test('establish a base realm', async () => {
    const config: Realm.Configuration = {
      schema: [Person],
    };

    // Establish base realm and schema to check modifications against.
    Realm.open(config).then(realm => {
      // Write initial object to local realm
      realm.write(() => {
        realm.create('Person', {
          _id: '1239feaae9',
          firstName: 'Bilbo',
          lastName: 'Baggins',
        });
      });

      expect(realm.schemaVersion).toBe(0);

      realm.close();
    });

    expect(Realm.exists(config)).toBe(true);
  });

  test('add a property to a schema', async () => {
    let higherOrderSchema: Realm.CanonicalObjectSchema;
    let higherOrderSchemaVersion: number;

    // :snippet-start: add-a-property-to-schema
    class Person extends Realm.Object<Person> {
      _id!: string;
      firstName!: string;
      lastName!: string;
      age!: number;

      static schema: ObjectSchema = {
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

    const config: Realm.Configuration = {
      schema: [Person],
      // Increment the 'schemaVersion', since 'age' has been added to the schema.
      // The initial schemaVersion is 0.
      schemaVersion: 2,
    };

    // pass the configuration object with the updated 'schemaVersion' to
    // createRealmContext()
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      higherOrderSchema = realm.schema[0];
      higherOrderSchemaVersion = realm.schemaVersion;

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);

    // Wait for `RestOfApp` to render and change higher order values.
    await waitFor(() => {
      // This test assumes only one object model exists.
      expect(higherOrderSchema).toHaveProperty('properties.age');
      expect(higherOrderSchemaVersion).toBe(2);
    });
  });

  test('delete a property from a schema', async () => {
    let higherOrderSchema: Realm.CanonicalObjectSchema;
    let higherOrderSchemaVersion: number;

    // :snippet-start: delete-a-property-from-a-schema
    class Person extends Realm.Object<Person> {
      _id!: string;
      firstName!: string;
      age!: number;

      static schema: ObjectSchema = {
        name: 'Person',
        properties: {
          _id: 'string',
          firstName: 'string',
          age: 'int',
        },
      };
    }

    const config: Realm.Configuration = {
      schema: [Person],
      // Increment the 'schemaVersion', since 'lastName' has been removed from the schema.
      // The initial schemaVersion is 0.
      schemaVersion: 3,
    };

    // pass the configuration object with the updated 'schemaVersion' to createRealmContext()
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      higherOrderSchema = realm.schema[0];
      higherOrderSchemaVersion = realm.schemaVersion;

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);

    // Wait for `RestOfApp` to render and change higher order values.
    await waitFor(() => {
      // This test assumes only one object model exists.
      expect(higherOrderSchema).not.toHaveProperty('properties.lastName');
      expect(higherOrderSchemaVersion).toBe(3);
    });
  });

  test('rename a property', async () => {
    let higherOrderSchema: Realm.CanonicalObjectSchema;
    let higherOrderSchemaVersion: number;

    // :snippet-start: rename-a-property-of-a-schema
    class Person extends Realm.Object<Person> {
      _id!: string;
      fullName!: string;
      age!: number;

      static schema: ObjectSchema = {
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

    class OldObjectModel extends Realm.Object<OldObjectModel> {
      _id!: string;
      firstName!: string;
      lastName!: string;
      age!: number;

      static schema: ObjectSchema = {
        name: 'Person',
        properties: {
          _id: 'string',
          firstName: 'string',
          lastName: 'string',
        },
      };
    }

    const config: Realm.Configuration = {
      schema: [Person],
      // Increment the 'schemaVersion', since 'fullName' has replaced
      // 'firstName' and 'lastName' in the schema.
      // The initial schemaVersion is 0.
      schemaVersion: 4,
      onMigration: (oldRealm: Realm, newRealm: Realm) => {
        // only apply this change if upgrading schemaVersion
        if (oldRealm.schemaVersion < 4) {
          const oldObjects: Realm.Results<OldObjectModel> =
            oldRealm.objects(OldObjectModel);
          const newObjects: Realm.Results<Person> = newRealm.objects(Person);
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
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      higherOrderSchema = realm.schema[0];
      higherOrderSchemaVersion = realm.schemaVersion;

      return (
        <View>
          <Text testID='test-log-in'>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);

    // Wait for `RestOfApp` to render and change higher order values.
    await waitFor(() => {
      // This test assumes only one object model exists.
      expect(higherOrderSchema).not.toHaveProperty('properties.lastName');
      expect(higherOrderSchema).not.toHaveProperty('properties.firstName');
      expect(higherOrderSchema).toHaveProperty('properties.fullName');
      expect(higherOrderSchemaVersion).toBe(4);
    });
  });

  test('modify a property type', async () => {
    let higherOrderSchema: Realm.CanonicalObjectSchema;
    let higherOrderSchemaVersion: number;

    // :snippet-start: modify-a-property-type
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
      schemaVersion: 5,
      onMigration: (oldRealm: Realm, newRealm: Realm) => {
        if (oldRealm.schemaVersion < 5) {
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
    const {RealmProvider, useRealm} = createRealmContext(config);
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <RestOfApp />
      </RealmProvider>
    );

    const RestOfApp = () => {
      const realm = useRealm();

      higherOrderSchema = realm.schema[0];
      higherOrderSchemaVersion = realm.schemaVersion;

      return (
        <View>
          <Text>This is the rest of the app!</Text>
        </View>
      );
    };

    render(<App />);

    // Wait for `RestOfApp` to render and change higher order values.
    await waitFor(() => {
      // This test assumes only one object model exists.
      expect(higherOrderSchema.properties._id.type).toBe('objectId');
      expect(higherOrderSchemaVersion).toBe(5);
    });
  });
});
// :replace-end:
