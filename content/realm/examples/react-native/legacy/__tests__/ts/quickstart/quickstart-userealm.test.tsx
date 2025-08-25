// :snippet-start: quickstart-setup
import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
// :remove-start:
import {useState} from 'react';
import {FlatList, Pressable, Text, View, Button} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
let higherOrderProfileName: string;
const YOUR_PRIMARY_KEY = new Realm.BSON.ObjectId();
// :remove-end:

// Define your object model
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.ObjectId;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Profile],
};

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp objectPrimaryKey={YOUR_PRIMARY_KEY} />
    </RealmProvider>
  );
}

type RestOfAppProps = {
  objectPrimaryKey: Realm.BSON.ObjectId;
};

const RestOfApp = ({objectPrimaryKey}: RestOfAppProps) => {
  const [selectedProfileId, setSelectedProfileId] = useState(objectPrimaryKey);
  const realm = useRealm();

  const changeProfileName = (profileToChange: Profile, newName: string) => {
    realm.write(() => {
      profileToChange.name = newName;
    });
    // :remove-start:
    // For testing. Set the profile name to indicate profile object has changed.
    higherOrderProfileName = activeProfile!.name;
    // :remove-end:
  };

  // ... rest of component

  // :remove-start:
  const profiles = useQuery(Profile);
  const activeProfile = useObject(Profile, selectedProfileId);

  return (
    <View>
      <View>
        <Text>Select a profile to view details</Text>
        <FlatList
          data={profiles.sorted('name')}
          keyExtractor={item => item._id.toHexString()}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  setSelectedProfileId(item._id);
                }}>
                <Text>{item.name}</Text>
              </Pressable>
            );
          }}
        />
      </View>
      <View>
        <Text>Active profile: {activeProfile?.name}</Text>
        <Button
          onPress={() => {
            changeProfileName(activeProfile!, 'NewName');
          }}
          testID='test-change-name' // :remove:
          title='Change name'
        />
      </View>
    </View>
  );
};
// :remove-end:
// :snippet-end:

beforeEach(async () => {
  const realm = await Realm.open(realmConfig);

  realm.write(() => {
    // Create a profile object.
    realm.create('Profile', {
      name: 'TestProfile',
      _id: YOUR_PRIMARY_KEY,
    });

    realm.create('Profile', {
      name: 'SecondProfile',
      _id: new Realm.BSON.ObjectId(),
    });
  });

  higherOrderProfileName = 'TestProfile';

  realm.close();
});

afterEach(async () => {
  const realm = await Realm.open(realmConfig);

  realm.write(() => {
    // Clean up. Delete all objects in the realm.
    realm.deleteAll();
  });

  realm.close();
});

test('Instantiate AppWrapperSync and change object name', async () => {
  const {findByTestId} = render(<AppWrapper />);
  const button = await findByTestId('test-change-name');

  fireEvent.press(button);

  await waitFor(
    () => {
      expect(higherOrderProfileName).toBe('NewName');
    },
    {timeout: 2000},
  );
});
