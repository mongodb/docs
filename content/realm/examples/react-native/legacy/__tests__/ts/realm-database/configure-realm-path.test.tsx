// :snippet-start: configure-realm-path
import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp, useRealm} from '@realm/react';
import {Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';
const customBaseFilePath = 'customBasePath';
const customRealmPath = 'customRealmPath';
let higherScopeRealmPath: string;

class Profile extends Realm.Object<Profile> {
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

type AppWrapperSyncProps = {
  customBaseFilePath: string;
};

function AppWrapperSync({customBaseFilePath}: AppWrapperSyncProps) {
  return (
    <AppProvider id={APP_ID} baseFilePath={customBaseFilePath}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          path={customRealmPath}
          schema={[Profile]}
          sync={{
            flexible: true,
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
  higherScopeRealmPath = realm.path;

  return (
    <>
      <Text testID='text-container'>Rest of the app!</Text>
    </>
  );
}

describe('Test Custom Realm Path', () => {
  beforeAll(() => {
    // Close and delete realm at the default path.
    Realm.clearTestState();
  });

  test('Instantiate AppWrapperSync and test sync', async () => {
    render(<AppWrapperSync customBaseFilePath={customBaseFilePath} />);

    await waitFor(() => {
      expect(higherScopeRealmPath).toEqual(
        `${customBaseFilePath}/${customRealmPath}`,
      );
    });
  });
});
