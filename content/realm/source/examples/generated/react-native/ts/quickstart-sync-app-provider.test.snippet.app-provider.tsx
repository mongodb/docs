import React from 'react';
import {AppProvider} from '@realm/react';

function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <RestOfApp />
    </AppProvider>
  );
}
