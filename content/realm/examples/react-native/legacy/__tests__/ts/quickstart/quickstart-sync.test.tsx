// :snippet-start: quickstart-setup
import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import {useState} from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {FlatList, Pressable, Text, View} from 'react-native';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles: number;
let primaryKey: Realm.BSON.ObjectId;
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

// Expose a sync realm
function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Profile'));
              },
            },
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

function RestOfApp() {
  const [selectedProfileId, setSelectedProfileId] = useState(primaryKey);
  const realm = useRealm();
  const profiles = useQuery(Profile);
  const activeProfile = useObject(Profile, selectedProfileId);

  const addProfile = (name: string) => {
    realm.write(() => {
      realm.create('Profile', {
        name: name,
        _id: new Realm.BSON.ObjectId(),
      });
    });
  };

  const changeProfileName = (newName: string) => {
    realm.write(() => {
      activeProfile!.name = newName;
    });
  };

  const deleteProfile = () => {
    realm.write(() => {
      realm.delete(activeProfile);
    });
  };

  // Check profile length to confirm this is the same sync realm as
  // that set up in beforeEach(). Then set numberOfProfiles to the length.
  if (profiles.length) {
    numberOfProfiles = profiles.length;
  }

  return (
    <View>
      <View>
        <Text>Select a profile to view details</Text>
        <FlatList
          data={profiles.sorted('name')}
          keyExtractor={item => item._id.toHexString()}
          renderItem={({item}) => {
            return (
              <Pressable onPress={setSelectedProfileId(item._id)}>
                <Text>{item.name}</Text>
              </Pressable>
            );
          }}
        />
      </View>
      <Text>{activeProfile?._id.toHexString()}</Text>
    </View>
  );
}

const app = new Realm.App(APP_ID);
const createConfig = (user: Realm.User): Realm.ConfigurationWithSync => {
  return {
    schema: [Profile],
    sync: {
      user: user,
      flexible: true,
    },
  };
};

beforeEach(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config = createConfig(user);
  const realm = await Realm.open(config);
  const id = new Realm.BSON.ObjectId();

  realm.subscriptions.update((subs, myRealm) => {
    subs.add(myRealm.objects('Profile'));
  });

  realm.write(() => {
    // Create a profile object.
    realm.create('Profile', {
      name: 'TestProfile',
      _id: id,
    });
  });

  primaryKey = id;

  realm.close();

  await user.logOut();
});

afterEach(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config = createConfig(user);
  const realm = await Realm.open(config);

  realm.subscriptions.update((subs, myRealm) => {
    subs.add(myRealm.objects('Profile'));
  });

  realm.write(() => {
    // Clean up. Delete all objects in the realm.
    realm.deleteAll();
  });

  numberOfProfiles = 0;

  realm.close();

  await user.logOut();
});

test('Instantiate AppWrapperSync and test sync', async () => {
  render(<AppWrapperSync />);

  await waitFor(
    () => {
      expect(numberOfProfiles).toBe(1);
    },
    {timeout: 2000},
  );
});
