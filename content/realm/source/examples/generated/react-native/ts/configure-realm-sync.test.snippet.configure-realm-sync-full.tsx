import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';

function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[YourObjectModel]}
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(YourObjectModel));
              },
            },
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

