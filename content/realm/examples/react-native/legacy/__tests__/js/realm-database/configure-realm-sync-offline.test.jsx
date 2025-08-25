// :snippet-start: offline-config
import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp, useQuery, useRealm} from '@realm/react';
import {Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles;

class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
// :remove-end:

function AppWrapperOfflineSync() {
  const realmAccessBehavior = {
    type: 'openImmediately',
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Profile]}
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
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
  const realm = useRealm();
  const profiles = useQuery(Profile);

  useEffect(() => {
    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Profile'));
    });
  });

  // Check profile length to confirm this is the same sync realm as
  // that set up in beforeEach(). Then set numberOfProfiles to the length.
  if (profiles.length) {
    numberOfProfiles = profiles.length;
  }

  return (
    <>
      <Text>Rest of the app!</Text>
    </>
  );
}

const app = new Realm.App(APP_ID);
const createConfig = user => {
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

  realm.subscriptions.update((subs, myRealm) => {
    subs.add(myRealm.objects('Profile'));
  });

  realm.write(() => {
    // Create a profile object.
    realm.create('Profile', {
      name: 'TestProfile',
      _id: new Realm.BSON.UUID(),
    });
  });

  realm.close();

  await user.logOut();
});

afterEach(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config = createConfig(user);
  const realm = await Realm.open(config);

  realm.write(() => {
    // Clean up. Delete all objects in the realm.
    realm.deleteAll();
  });

  numberOfProfiles = 0;

  realm.close();

  await user.logOut();
});

test('Instantiate AppWrapperOfflineSync and test sync', async () => {
  render(<AppWrapperOfflineSync />);

  await waitFor(
    () => {
      expect(numberOfProfiles).toBeGreaterThanOrEqual(1);
    },
    {timeout: 2000},
  );
});
