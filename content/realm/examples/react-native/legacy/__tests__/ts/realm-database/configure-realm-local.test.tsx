// :snippet-start: configure-realm
import React from 'react';
import {RealmProvider} from '@realm/react';
// :remove-start:
import {Realm, useRealm} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';
import {View, Text} from 'react-native';
import {ObjectSchema} from 'realm';

let isRealmClosed = true;

function RestOfApp() {
  const realm = useRealm();

  isRealmClosed = realm.isClosed;

  expect(realm.schema[0].name).toBe('Turtle');

  return (
    <View>
      <Text>Turtle!</Text>
    </View>
  );
}

class YourObjectModel extends Realm.Object<YourObjectModel> {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema: ObjectSchema = {
    name: 'Turtle',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}
// :remove-end:

function AppWrapperLocal() {
  return (
    <RealmProvider schema={[YourObjectModel]}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

test('Instantiate RealmProvider correctly', async () => {
  const {findByText} = render(<AppWrapperLocal />);
  const renderedText = await findByText('Turtle!');

  expect(renderedText).toBeTruthy();

  await waitFor(() => {
    expect(isRealmClosed).toBe(false);
  });
});
