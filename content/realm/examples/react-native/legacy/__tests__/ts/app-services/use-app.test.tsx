// :snippet-start: use-app
import React from 'react';
import {useApp} from '@realm/react';
import {Credentials} from 'realm';
// :remove-start:
import {App} from 'realm';
import {AppProvider} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <MyApp />
      </AppProvider>
    </View>
  );
}
// :remove-end:
function MyApp() {
  const app = useApp();
  function logInAnonymousUser() {
    app.logIn(Credentials.anonymous());
  }
  // ...
  // :remove-start:
  return <Button onPress={logInAnonymousUser} testID='test-use-app' title='Test Me!' />;
  // :remove-end:
}
// :snippet-end:

afterEach(async () => await App.getApp(APP_ID).currentUser?.logOut());

test('useApp hook works correctly', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const button = getByTestId('test-use-app');
  fireEvent.press(button);
  await waitFor(() => expect(App.getApp(APP_ID).currentUser).not.toBeNull());
});
