// :snippet-start: read-refresh-custom-user-data
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

const readTestId = 'test-read-custom-user-data';
const refreshTestId = 'test-refresh-custom-user-data';
const credentials = Credentials.emailPassword(
  'test-rn-cud@example.com',
  'abc123',
);

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={<LogIn />}>
          <ReadCustomUserData />
        </UserProvider>
      </AppProvider>
    </View>
  );
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(credentials);
  }, []);
  return <></>;
}
// :remove-end:

function ReadCustomUserData() {
  const user = useUser();
  const [customUserData, setCustomUserData] = useState();

  // Access current custom user data with `user.customData`
  function readCurrentCustomUserData() {
    setCustomUserData(user.customData);
    expect(user?.customData).toBe(null); // :remove:
  }

  // Refresh custom user data with `user.refreshCustomData()`
  async function refreshCustomUserData() {
    const data = await user.refreshCustomData();
    setCustomUserData(data);
    expect(data.favoriteColor).toBe('purple'); // :remove:
  }

  // ...
  // :remove-start:
  return (
    <>
      <Button
        onPress={readCurrentCustomUserData}
        testID={readTestId}
        title='Test Me!'
      />
      <Button
        onPress={refreshCustomUserData}
        testID={refreshTestId}
        title='Test Me!'
      />
    </>
  );
  // :remove-end:
}
// :snippet-end:
beforeAll(async () => {
  // fails if user already exits
  try {
    await App.getApp(APP_ID).emailPasswordAuth.registerUser({
      email: 'test-rn-cud@example.com',
      password: 'abc123',
    });
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  const app = App.getApp(APP_ID);
  const user = await app.logIn(credentials);
  await user
    .mongoClient('mongodb-atlas')
    .db('custom-user-data-database')
    .collection('custom-user-data')
    .deleteOne({userId: user.id});
  await app.deleteUser(user);
});

test('read custom user data', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const readButton = await waitFor(() => getByTestId(readTestId));
  fireEvent.press(readButton);
});
test('refresh custom user data', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const refreshButton = await waitFor(() => getByTestId(refreshTestId));
  fireEvent.press(refreshButton);
});
