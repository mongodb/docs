// :snippet-start: find-sort-filter
import React, {useState} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
// :remove-start:
import {Button} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
let higherOrderProfileName;
const YOUR_PRIMARY_KEY = new Realm.BSON.ObjectId();
// :remove-end:

// Define your object model
class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig = {
  schema: [Profile],
};

// Create a realm context
const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <FindSortFilterComponent objectPrimaryKey={YOUR_PRIMARY_KEY} />
    </RealmProvider>
  );
}

const FindSortFilterComponent = ({objectPrimaryKey}) => {
  const [activeProfile, setActiveProfile] = useState();
  const [allProfiles, setAllProfiles] = useState();
  const currentlyActiveProfile = useObject(Profile, objectPrimaryKey);
  const profiles = useQuery(Profile);

  const sortProfiles = reversed => {
    const sorted = useQuery(
      Profile,
      profiles => {
        return profiles.sorted('name', reversed);
      },
      [reversed],
    );

    setAllProfiles(sorted);
  };

  const filterProfiles = (filter, letter) => {
    // Use [c] for case-insensitivity.
    const filtered = useQuery(
      Profile,
      profiles => {
        return profiles.filtered(`name ${filter}[c] "${letter}"`);
      },
      [filter, letter],
    );

    setAllProfiles(filtered);
    // For testing only. Ensures filtering works. // :remove:
    higherOrderProfileName = filtered[0].name; // :remove:
  };

  // ... rest of component
  // :remove-start:
  return (
    <Button
      onPress={() => {
        filterProfiles('BEGINSWITH', 's');
      }}
      testID='test-change-name'
      title='Filter profiles'
    />
  );
  // :remove-end:
};
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
      expect(higherOrderProfileName).toBe('SecondProfile');
    },
    {timeout: 2000},
  );
});
