// :snippet-start: user-provider
import React from 'react';
import {useApp, AppProvider, UserProvider} from '@realm/react';
import {Button} from 'react-native';
// :remove-start:
import Realm from 'realm';
import {render, waitFor, fireEvent} from '@testing-library/react-native';

const APP_ID = 'js-flexible-oseso';
const testId = 'test-log-in';
let higherScopedUser: Realm.User | null;
// :remove-end:

function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  async function logInUser() {
    // When anonymous authentication is enabled, users can immediately log
    // into your app without providing any identifying information.
    await app.logIn(Realm.Credentials.anonymous());
    higherScopedUser = app.currentUser; // :remove:
  }

  return (
    <Button
      title='Log In'
      onPress={logInUser}
      testID={testId} // :remove:
    />
  );
}
// :snippet-end:

let restOfAppRendered = false;

function RestOfApp() {
  restOfAppRendered = true;
  return <></>;
}

afterEach(async () => await Realm.App.getApp(APP_ID).currentUser?.logOut());

test('Log in user', async () => {
  const {getByTestId} = render(<AppWrapperSync />);
  const button = await waitFor(() => getByTestId(testId));
  fireEvent.press(button);
  await waitFor(() => {
    expect(restOfAppRendered).toBe(true);
    expect(higherScopedUser).toBeInstanceOf(Realm.User);
  });
});
