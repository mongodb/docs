// :snippet-start: log-in-user
import React from 'react';
import {useApp, UserProvider, AppProvider} from '@realm/react';
import {Button} from 'react-native';
// :remove-start:
import Realm from 'realm';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

const APP_ID = 'example-testers-kvjdy';
const testId = 'test-log-in';
let higherScopedUser: Realm.User | null;
// :remove-end:

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      {/* If there is no authenticated user,
          the app mounts the `fallback` component.
          Once the user successfully authenticates,
          the app unmounts the component in the
          `UserProvider.fallback` prop
          (the `LogIn` component in this example). */}
      <UserProvider fallback={LogIn}>
        {/* Components with access to the user.
            These components only mount
            if there's an authenticated user.*/}
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  // This example uses anonymous authentication.
  // However, you can use any authentication provider
  // to log a user in with this pattern.
  async function logInUser() {
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
  const {getByTestId} = render(<AppWrapper />);
  await waitFor(
    async () => {
      const button = await getByTestId(testId);
      fireEvent.press(button);
    },
    {timeout: 1000},
  );
  await waitFor(() => {
    expect(restOfAppRendered).toBe(true);
    expect(higherScopedUser).toBeInstanceOf(Realm.User);
  });
});
