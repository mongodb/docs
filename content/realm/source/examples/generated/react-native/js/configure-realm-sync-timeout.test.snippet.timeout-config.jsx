import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';

function AppWrapperTimeoutSync() {
  const realmAccessBehavior = {
    type: 'downloadBeforeOpen',
    timeOutBehavior: 'openLocalRealm',
    timeOut: 1000,
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
