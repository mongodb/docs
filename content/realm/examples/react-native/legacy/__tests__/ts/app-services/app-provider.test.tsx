// :snippet-start: app-provider
import React from 'react';
import {AppProvider} from '@realm/react';
// :remove-start:
import {render} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {View, Text} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

function MyApp() {
  const app = useApp();
  if (app.id !== APP_ID) {
    throw new Error('Did not instantiate app client');
  }
  return (
    <View>
      <Text>Foo</Text>
    </View>
  );
}
// :remove-end:
function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <MyApp />
      </AppProvider>
    </View>
  );
}
// :snippet-end:

test('Instantiate AppProvider correctly', () => {
  render(<AppWrapper />);
});
