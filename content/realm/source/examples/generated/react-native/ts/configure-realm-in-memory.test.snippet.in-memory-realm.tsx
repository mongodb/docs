import React from 'react';
import {Realm, RealmProvider} from '@realm/react';

function AppWrapperLocal() {
  return (
    <RealmProvider inMemory={true}>
      <RestOfApp />
    </RealmProvider>
  );
}
