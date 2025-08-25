// :snippet-start: configure-no-schema
import React from 'react';
import {RealmProvider} from '@realm/react';
// :remove-start:
import {Text, FlatList} from 'react-native';
import Business from '../Models/Business';
import Address from '../Models/Address';
import {Realm, useRealm} from '@realm/react';
import {render} from '@testing-library/react-native';

let higherScopeSchema: Realm.CanonicalObjectSchema[];

function RestOfApp() {
  const realm: Realm = useRealm();
  const realmSchemas = realm.schema;
  higherScopeSchema = realm.schema;

  return (
    <FlatList
      data={realmSchemas}
      renderItem={({item}) => {
        <Text>{item.name}</Text>;
      }}
    />
  );
}
// :remove-end:

function AppWrapper() {
  return (
    // To access a realm at the default path, do not pass any configuration.
    // Requires a realm that has already been created.
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

describe('Test accessing no schema realm', () => {
  beforeAll(() => {
    // Close and delete realm at the default path.
    Realm.clearTestState();

    // Open new realm with schemas.
    Realm.open({
      schema: [Business, Address],
    });
  });

  test('Instantiate RealmProvider', () => {
    // Render the component, which creates/opens a realm with a schema
    // using RealmProvider.
    render(<AppWrapper />);

    // Check that higherScopeSchema has schemas.
    expect(higherScopeSchema.length).toBe(2);
  });

  // AppWrapper unmounts after the previous test, which means the realm with
  // a schema has been closed.
  test('Open realm with no schema and match with higherScopeSchema', () => {
    // Reopen realm without a schema
    const reopenedRealm = new Realm();

    // Expect the schemas to match
    expect(reopenedRealm.schema.length).toBe(2);
    expect(reopenedRealm.schema).toEqual(higherScopeSchema);
  });
});
