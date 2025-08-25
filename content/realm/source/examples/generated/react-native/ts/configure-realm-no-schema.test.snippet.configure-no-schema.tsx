import React from 'react';
import {RealmProvider} from '@realm/react';

function AppWrapper() {
  return (
    // To access a realm at the default path, do not pass any configuration.
    // Requires a realm that has already been created.
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
