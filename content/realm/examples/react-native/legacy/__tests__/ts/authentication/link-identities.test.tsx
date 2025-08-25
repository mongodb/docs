// :snippet-start: link-identities
import React, {useEffect, useState} from 'react';
import {AppProvider, UserProvider, useApp, useUser} from '@realm/react';
import Realm from 'realm';
import {View, Button, Text, TextInput} from 'react-native';
// :remove-start:
import {render, fireEvent, waitFor} from '@testing-library/react-native';
const APP_ID = 'example-testers-kvjdy';
const rand = Date.now().toString();
const userPass = {
  email: `user+link-identities-${rand}@example.com`,
  password: 'abc123',
};
let higherScopeUser: Realm.User;
// :remove-end:

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={<AnonymousLogIn />}>
          {/* ...Rest of app */}
          <SignUpUser />
        </UserProvider>
      </AppProvider>
    </View>
  );
}

// Log in an anonymous user when the app opens
// if not already logged in current user.
function AnonymousLogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);
  return null;
}

// Link user credentials. The component contains a form
// where the user can add and link credentials.
function SignUpUser() {
  const app = useApp();
  const user = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Link email/password credentials to anonymous user
  // when creating and logging in email/password user.
  const registerAndLinkIdentities = async () => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});

      const credentials = Realm.Credentials.emailPassword(email, password);
      await user.linkCredentials(credentials);
      higherScopeUser = user; // :remove:
    } catch (err) {
      // Add error handling logic here
    }
  };

  return (
    <View>
      <Text>Log In User</Text>
      <View>
        <Text>Email Address:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          testID='email-address-input' // :remove:
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          testID='password-input' // :remove:
        />
      </View>
      <Button
        onPress={registerAndLinkIdentities}
        testID='test-link-identities-button' // :remove:
        title='Link Credentials'
      />
    </View>
  );
}

// :snippet-end:

beforeEach(async () => {
  const app = await Realm.App.getApp(APP_ID);
  const users = Object.values(app.allUsers);
  await Promise.all(users.map(user => app.deleteUser(user)));
});
afterEach(async () => {
  const app = await Realm.App.getApp(APP_ID);
  const users = Object.values(app.allUsers);
  await Promise.all(users.map(user => app.deleteUser(user)));
});

test('Link user identities', async () => {
  const {getByTestId} = render(<AppWrapper />);

  const [emailInput, passwordInput, button] = await waitFor(() => [
    getByTestId('email-address-input'),
    getByTestId('password-input'),
    getByTestId('test-link-identities-button'),
  ]);
  fireEvent.changeText(emailInput, userPass.email);
  fireEvent.changeText(passwordInput, userPass.password);
  fireEvent.press(button);
  await waitFor(() => {
    let hasEmailPasswordCredentials = false;
    let hasAnonCredentials = false;
    higherScopeUser.identities.forEach(identity => {
      if (identity.providerType === 'local-userpass') {
        hasEmailPasswordCredentials = true;
      }
      if (identity.providerType === 'anon-user') {
        hasAnonCredentials = true;
      }
    });
    expect(hasEmailPasswordCredentials).toBe(true);
    expect(hasAnonCredentials).toBe(true);
  });
});
