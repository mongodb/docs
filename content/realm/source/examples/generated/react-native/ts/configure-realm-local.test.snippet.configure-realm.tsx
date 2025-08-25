import React from 'react';
import {RealmProvider} from '@realm/react';

function AppWrapperLocal() {
  return (
    <RealmProvider schema={[YourObjectModel]}>
      <RestOfApp />
    </RealmProvider>
  );
}
