// :snippet-start: call-function
import React from 'react';
import {useUser} from '@realm/react';
// :remove-start:
import {Credentials} from 'realm';
import {useEffect, useState} from 'react';
import {App} from 'realm';
import {AppProvider, UserProvider, useApp} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button, Text} from 'react-native';

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

function MyApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous()).then(user => user && setLoggedIn(true));
  }, []);
  // ...
  return loggedIn ? (
    <View>
      <UserProvider>
        <Text>Foo!</Text>
        <Addition />
      </UserProvider>
    </View>
  ) : null;
}

let higherScopedSum: number;
// :remove-end:

function Addition() {
  // Get currently logged in user
  const user = useUser();

  const addNumbers = async (numA: number, numB: number) => {
    // Call Atlas Function

    // Method 1: call with User.callFunction()
    const sumMethod1 = await user?.callFunction('sum', numA, numB);

    // Method 2: Call with User.function.<Function name>()
    const sumMethod2 = await user?.functions.sum(numA, numB);

    // Both methods return the same result
    console.log(sumMethod1 === sumMethod2); // true
    // :remove-start:
    expect(sumMethod1).toBe(sumMethod2);
    higherScopedSum = sumMethod1 as number;
    // :remove-end:
  };
  // ...
  // :remove-start:
  return <Button onPress={() => addNumbers(1, 2)} testID='test-function-call' title='Test Me!' />;
  // :remove-end:
}
// :snippet-end:

afterEach(async () => await App.getApp(APP_ID).currentUser?.logOut());

test('Call Atlas Function', async () => {
  const {getByTestId} = render(<AppWrapper />);

  const button = await waitFor(() => getByTestId('test-function-call'));
  fireEvent.press(button);
  await waitFor(() => expect(higherScopedSum).toBe(3));
});
