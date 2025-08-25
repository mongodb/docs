import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';

function AppWrapperOfflineSync() {
  const realmAccessBehavior = {
    type: 'openImmediately',
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Profile]}
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
