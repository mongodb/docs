// :snippet-start: delete-user
import React, {useState, useEffect} from 'react';
import {useApp, useUser} from '@realm/react';
// :remove-start:
import {UserProvider} from '@realm/react';
import {Credentials} from 'realm';
import {App} from 'realm';
import {AppProvider} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <MyApp />
      </AppProvider>
    </View>
  );
}

function MyApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous()).then(user => user && setLoggedIn(true));
  }, []);
  // ...
  return loggedIn ? (
    <View>
      <UserProvider>
        <DeleteUser />
      </UserProvider>
    </View>
  ) : null;
}
// :remove-end:

function DeleteUser() {
  const app = useApp();
  const user = useUser();

  async function deleteUser() {
    // Delete the currently logged in user
    await app.deleteUser(user);
    expect(app.currentUser).toBeNull(); // :remove:
  }
  // ...
  // :remove-start:
  return (
    <Button onPress={deleteUser} testID='test-delete-user' title='Test Me!' />
  );
  // :remove-end:
}
// :snippet-end:

afterEach(async () => await App.getApp(APP_ID).currentUser?.logOut());

test('delete user', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const button = await waitFor(() => getByTestId('test-delete-user'));
  fireEvent.press(button);
  await waitFor(() => expect(App.getApp(APP_ID).currentUser).toBeNull());
});
