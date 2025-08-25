import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';

function AppWrapperSync({customBaseFilePath}) {
  return (
    <AppProvider id={APP_ID} baseFilePath={customBaseFilePath}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          path={customRealmPath}
          schema={[Profile]}
          sync={{
            flexible: true,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
