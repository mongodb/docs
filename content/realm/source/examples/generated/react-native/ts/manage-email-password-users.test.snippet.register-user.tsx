import React from 'react';
import {useApp, UserProvider, AppProvider} from '@realm/react';
import Realm from 'realm';

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={<RegisterUser />}>
          {/* ...Other components in app that require authentication */}
        </UserProvider>
      </AppProvider>
    </View>
  );
}

function RegisterUser() {
  const app = useApp();

  async function register(email: string, password: string) {
    // Register new email/password user
    await app.emailPasswordAuth.registerUser({email, password});
    // Log in the email/password user
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }
  // ...
}
