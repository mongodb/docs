import React from 'react';
import {useApp, UserProvider, AppProvider} from '@realm/react';
import {Button} from 'react-native';

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
  }

  return (
    <Button
      title='Log In'
      onPress={logInUser}
    />
  );
}
