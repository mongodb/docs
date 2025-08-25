// :snippet-start: app-provider
import React from 'react';
import {AppProvider} from '@realm/react';
// :remove-start:
import {render} from '@testing-library/react-native';
import {useApp} from '@realm/react';

const APP_ID = 'js-flexible-oseso';
// :remove-end:

function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <RestOfApp />
    </AppProvider>
  );
}
// :snippet-end:

let restOfAppRendered = false;

function RestOfApp() {
  const app = useApp();

  if (app.id !== APP_ID) {
    throw new Error('Did not instantiate app client');
  }

  return <></>;
}

test('Instantiate AppProvider correctly', () => {
  render(<AppWrapperSync />);
});
