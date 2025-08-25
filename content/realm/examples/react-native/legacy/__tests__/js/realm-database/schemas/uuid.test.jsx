import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import UuidProfile from '../../Models/UuidProfile';

// :replace-start: {
//    "terms": {
//       "UuidProfile": "Profile"
//    }
// }
const realmConfig = {
  schema: [UuidProfile],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm} = createRealmContext(realmConfig);

let assertionRealm;

// test describe block for the uuid schema
describe('uuid schema', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(UuidProfile));

      assertionRealm.create('UuidProfile', {
        name: 'Tony Stark',
        _id: new Realm.BSON.UUID(),
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });

  it('should be able to create a new uuid', async () => {
    // :snippet-start: create-uuid-object
    const CreateProfileInput = () => {
      const realm = useRealm();
      const [name, setName] = useState('');

      // createProfile creates a new 'UuidProfile' Realm Object with a new UUID based on user input
      const createProfile = () => {
        realm.write(() => {
          realm.create('UuidProfile', {
            name,
            _id: new Realm.BSON.UUID(),
          });
        });
      };
      return (
        <View>
          <TextInput
            testID='nameInput' // :remove:
            placeholder='Name'
            onChangeText={setName}
          />
          <Button
            testID='createProfileButton' // :remove:
            title='Create Profile'
            onPress={createProfile}
          />
        </View>
      );
      // :snippet-end:
    };
    const App = () => (
      <RealmProvider>
        <CreateProfileInput />
      </RealmProvider>
    );

    const {getByTestId} = render(<App />);

    // Test that the createProfileButton's onPress method creates a new UuidProfile Object with a new UUID
    const nameInput = await waitFor(() => getByTestId('nameInput'), {
      timeout: 5000,
    });
    const createProfileButton = await waitFor(
      () => getByTestId('createProfileButton'),
      {timeout: 5000},
    );

    await act(() => {
      fireEvent.changeText(nameInput, 'Steve Rogers');
    });
    await act(() => {
      fireEvent.press(createProfileButton);
    });

    // Test that the UuidProfile Object with the new UUID was created using the assertionRealm and that the name is correct
    const profiles = assertionRealm.objects(UuidProfile);
    expect(profiles.length).toBe(2);
    expect(profiles[1].name).toBe('Steve Rogers');
  });
});
// :replace-end:
