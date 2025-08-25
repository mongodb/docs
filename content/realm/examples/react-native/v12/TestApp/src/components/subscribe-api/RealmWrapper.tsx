import React, {useEffect} from 'react';
import Realm, {Credentials} from 'realm';
import {AppProvider, UserProvider, RealmProvider, useApp} from '@realm/react';

import {APP_ID} from '../../../appServicesConfig';

import {Bird} from '../../models';

import {Unsubscribe} from './Unsubscribe';
import {AlwaysWait} from './AlwaysWait';
import {WaitFirstTime} from './WaitFirstTime';
import {BasicSubscription} from './BasicSubscription';

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

export const SubscribeApiExamples = () => {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Bird]}
          sync={{
            flexible: true,
            initialSubscriptions: {
              update: (subs, realm) => {
                subs.add(realm.objects(Bird), {name: 'Initial birds'});
              },
              rerunOnOpen: true,
            },
          }}>
          <BasicSubscription />
          <WaitFirstTime />
          <AlwaysWait />
          <Unsubscribe />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
