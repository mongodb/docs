import React from 'react';
import {useApp, AppProvider, UserProvider} from '@realm/react';
import {Button} from 'react-native';

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
  }

  return (
    <Button
      title='Log In'
      onPress={logInUser}
    />
  );
}
