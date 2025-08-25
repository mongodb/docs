import React, {ReactNode, useEffect} from 'react';
import Realm, {Credentials, RealmObjectConstructor} from 'realm';
import {AppProvider, UserProvider, RealmProvider, useApp} from '@realm/react';

import {APP_ID} from '../../../appServicesConfig';

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

type SyncWrapperProps = {
  objectModels: RealmObjectConstructor[];
  children: ReactNode;
};

// TODO: Add path and other realm config options.

export const SyncWrapper = ({objectModels, children}: SyncWrapperProps) => {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[...objectModels]}
          sync={{
            flexible: true,
          }}>
          {children}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
