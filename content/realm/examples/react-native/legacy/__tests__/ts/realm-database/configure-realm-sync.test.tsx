// :snippet-start: configure-realm-sync-full
import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp, useQuery, useRealm} from '@realm/react';
import {Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';
let countOfYourObjectModel: number;

class YourObjectModel extends Realm.Object<YourObjectModel> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
// :remove-end:

function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[YourObjectModel]}
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(YourObjectModel));
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

// NOTE: Currently not testing the partition-based sync code. The App Services
// App we're using is for Flexible Sync and I don't think PB-based needs its
// own testing right now.
function AppWrapperPartitionSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        {/* :snippet-start: partition-based-config */}
        <RealmProvider
          schema={[YourObjectModel]}
          sync={{
            partitionValue: 'testPartition',
          }}>
          <RestOfApp />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

function RestOfApp() {
  const realm = useRealm();
  const profiles = useQuery(YourObjectModel);

  useEffect(() => {
    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Profile'));
    });
  });

  // Check profile length to confirm this is the same sync realm as
  // that set up in beforeEach(). Then set countOfYourObjectModel to the length.
  if (profiles.length) {
    countOfYourObjectModel = profiles.length;
  }

  return (
    <>
      <Text>Rest of the app!</Text>
    </>
  );
}

const app = new Realm.App(APP_ID);
const createConfig = (user: Realm.User): Realm.Configuration => {
  return {
    schema: [YourObjectModel],
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

  countOfYourObjectModel = 0;

  realm.close();

  await user.logOut();
});

test('Instantiate AppWrapperSync and test sync', async () => {
  render(<AppWrapperSync />);

  await waitFor(
    () => {
      expect(countOfYourObjectModel).toBeGreaterThanOrEqual(1);
    },
    {timeout: 2000},
  );
});
