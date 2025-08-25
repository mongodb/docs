// :snippet-start: write-custom-user-data
import React, {useEffect} from 'react';
import {useApp, useUser} from '@realm/react';
// :remove-start:
import {UserProvider} from '@realm/react';
import {Credentials} from 'realm';
import {App} from 'realm';
import {AppProvider} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

const testId = 'test-write-custom-user-data';
const credentials = Credentials.emailPassword(
  'test-rn-cud@example.com',
  'abc123',
);

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={<LogIn />}>
          <WriteCustomUserData />
        </UserProvider>
      </AppProvider>
    </View>
  );
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(credentials);
  }, []);
  return <></>;
}
let higherScopeResult: SimpleObject;
// :remove-end:

function WriteCustomUserData() {
  const user = useUser();

  async function writeCustomUserData(favoriteColor: string) {
    const customUserDataCollection = user
      .mongoClient('mongodb-atlas')
      .db('custom-user-data-database')
      .collection('custom-user-data');

    const filter = {
      userId: user.id, // Query for the user object of the logged in user
    };
    const updateDoc = {
      $set: {
        // Set User ID if it's not already set
        userId: user.id,
        // Set the logged in user's favorite color
        favoriteColor,
      },
    };
    const options = {upsert: true};

    await customUserDataCollection.updateOne(filter, updateDoc, options);

    // Refresh custom user data once it's been updated on the server
    const customUserData = await user.refreshCustomData();
    higherScopeResult = customUserData as SimpleObject; // :remove:
    console.log(customUserData);
  }
  // ...
  // :remove-start:
  return (
    <Button
      onPress={() => writeCustomUserData('pink')}
      testID={testId}
      title='Test Me!'
    />
  );
  // :remove-end:
}
// :snippet-end:
beforeAll(async () => {
  // fails if user already exits
  try {
    await App.getApp(APP_ID).emailPasswordAuth.registerUser({
      email: 'test-rn-cud@example.com',
      password: 'abc123',
    });
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  const app = App.getApp(APP_ID);
  const user = await app.logIn(credentials);
  await user
    .mongoClient('mongodb-atlas')
    .db('custom-user-data-database')
    .collection('custom-user-data')
    .deleteOne({userId: user.id});
  await app.deleteUser(user);
});

test('write custom user data', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const button = await waitFor(() => getByTestId(testId));
  fireEvent.press(button);
  await waitFor(() => expect(higherScopeResult.favoriteColor).toBe('pink'));
});
