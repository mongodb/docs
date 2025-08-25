import React, {useEffect, useState} from 'react';
import {Credentials, CompensatingWriteError, ErrorCallback} from 'realm';
import {AppProvider, UserProvider, RealmProvider, useApp} from '@realm/react';

import {CompensatingWriteErrorHandler} from './CompensatingWriteErrorRenderer';

import {Person, Turtle} from '../../models';

import {APP_ID} from '../../../appServicesConfig';

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

// :snippet-start: handle-compensating-write-error
export const CompensatingWriteErrorHandling = () => {
  const [error, setError] = useState<CompensatingWriteError | undefined>(
    undefined,
  );

  // Create a callback for sync error handling using CompensatingWriteError
  const errorCallback: ErrorCallback = (_session, error) => {
    if (error instanceof CompensatingWriteError) {
      // Handle the compensating write error as needed
      console.debug({
        code: error.code,
        name: error.name,
        category: error.category,
        message: error.message,
        url: error.logUrl,
        writes: error.writes,
      });

      setError(error);
    }
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Person, Turtle]}
          sync={{
            flexible: true,
            onError: errorCallback, // :emphasize:
            // :remove-start:
            initialSubscriptions: {
              update: (subs, realm) => {
                subs.add(realm.objects(Person).filtered('name == "Luigi"'), {
                  name: 'People named "Luigi"',
                });
                subs.add(realm.objects(Turtle).filtered('age > 5'), {
                  name: 'Turtles over 5 years old',
                });
              },
              rerunOnOpen: true,
            },
            // :remove-end:
          }}>
          <CompensatingWriteErrorHandler error={error} />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
// :snippet-end:
