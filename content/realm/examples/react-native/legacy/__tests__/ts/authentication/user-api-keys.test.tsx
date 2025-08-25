// :snippet-start: user-api-key
import React, {useEffect} from 'react';
import {useUser} from '@realm/react';
// :remove-start:
import {useApp} from '@realm/react';
import {UserProvider} from '@realm/react';
import {Credentials} from 'realm';
import {App} from 'realm';
import {AppProvider} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

const testId = 'test-user-api-key';
const emailPw = {
  email: 'test-rn-api-key@example.com',
  password: 'abc123',
};
const credentials = Credentials.emailPassword(emailPw.email, emailPw.password);

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={<LogIn />}>
          <UserApiKeys />
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

let higherScopeApiKey: Realm.Auth.ApiKey;
// :remove-end:

function UserApiKeys() {
  const user = useUser();

  async function createUserApiKey() {
    const apiKey = await user?.apiKeys.create('mySecretKey');
    // ...Do something with API key like save it
    // or share it with external service that authenticates
    // on user's behalf.
    // :remove-start:
    higherScopeApiKey = apiKey!;
    // :remove-end:
  }

  // ...
  // :remove-start:
  return (
    <>
      <Button onPress={createUserApiKey} testID={testId} title='Test Me!' />
    </>
  );
  // :remove-end:
}
// :snippet-end:
beforeAll(async () => {
  // fails if user already exits
  try {
    await App.getApp(APP_ID).emailPasswordAuth.registerUser(emailPw);
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  const app = App.getApp(APP_ID);
  const user = await app.logIn(credentials);
  await app.deleteUser(user);
});

test('read custom user data', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const readButton = await waitFor(() => getByTestId(testId));
  fireEvent.press(readButton);
  // give time for async operations in component to execute
  await waitFor(() => {
    expect(higherScopeApiKey.key).toBeDefined();
    expect(higherScopeApiKey.disabled).toBe(false);
  });
});
