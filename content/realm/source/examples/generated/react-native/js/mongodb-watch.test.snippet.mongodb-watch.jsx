import React, {useEffect} from 'react';
import Realm from 'realm';
import {useUser, useApp, AppProvider, UserProvider} from '@realm/react';

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <NotificationSetter />
      </UserProvider>
    </AppProvider>
  );
}

function NotificationSetter() {
  // Get currently logged in user
  const user = useUser();

  const watchForAllChanges = async (
    plants,
  ) => {
    // Watch for changes to the plants collection
    for await (const change of plants.watch()) {
      switch (change.operationType) {
        case 'insert': {
          const {documentKey, fullDocument} = change;
          // ... do something with the change information.
          break;
        }
        case 'update': {
          const {documentKey, fullDocument} = change;
          // ... do something with the change information.
          break;
        }
        case 'replace': {
          const {documentKey, fullDocument} = change;
          // ... do something with the change information.
          break;
        }
        case 'delete': {
          const {documentKey} = change;
          // ... do something with the change information.
          break;
        }
      }
    }
  };

  useEffect(() => {
    const plants = user
      .mongoClient('mongodb-atlas')
      .db('example')
      .collection('plants');

    // Set up notifications
    watchForAllChanges(plants);
  }, [user, watchForAllChanges]);
  // ... rest of component

}
