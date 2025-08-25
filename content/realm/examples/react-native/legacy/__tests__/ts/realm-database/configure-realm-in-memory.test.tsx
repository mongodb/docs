// :snippet-start: in-memory-realm
import React from 'react';
import {Realm, RealmProvider} from '@realm/react';
// :remove-start:
import {useRealm} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';
import {View, Text} from 'react-native';

let isRealmInMemory = false;

function RestOfApp() {
  const realm = useRealm();

  // Realm.js tests here: https://github.com/realm/realm-js/blob/4fe383de1a05b5e218cc7ca8111c2c16dda1966e/integration-tests/tests/src/tests/realm-constructor.ts#L333
  //@ts-expect-error TYPEBUG: isInMemory property does not exist
  isRealmInMemory = realm.isInMemory;

  return (
    <View>
      <Text>Foo</Text>
    </View>
  );
}
// :remove-end:

function AppWrapperLocal() {
  return (
    <RealmProvider inMemory={true}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

describe('Test Custom Realm Path', () => {
  beforeAll(() => {
    // Close and delete realm at the default path.
    Realm.clearTestState();
  });

  test('Instantiate in-memory realm correctly', async () => {
    render(<AppWrapperLocal />);

    await waitFor(() => {
      expect(isRealmInMemory).toBe(true);
    });
  });
});
