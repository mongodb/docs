import React, {useEffect, useState} from 'react';
import {AppProvider, UserProvider, useApp, useUser} from '@realm/react';
import Realm from 'realm';
import {View, Button, Text, TextInput} from 'react-native';

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
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        onPress={registerAndLinkIdentities}
        title='Link Credentials'
      />
    </View>
  );
}

