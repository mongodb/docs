// :snippet-start: add-query
import React, {useEffect} from 'react';
import {Text, FlatList} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
// :remove-start:
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
import {App, Credentials} from 'realm';
import {useApp} from '@realm/react';
import {render, screen} from '@testing-library/react-native';
import {Bird} from '../Models/Bird';

const APP_ID = 'js-flexible-oseso';

let numSubs: number;

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Bird]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              console.debug(error);
            },
          }}>
          <SubscriptionManager />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :remove-end:

function SubscriptionManager() {
  const realm = useRealm();
  const seenBirds = useQuery(Bird, birds => {
    return birds.filtered('haveSeen == true');
  });

  useEffect(() => {
    realm.subscriptions.update(
      (mutableSubs: Realm.App.Sync.MutableSubscriptionSet) => {
        mutableSubs.removeAll(); // :remove:

        // Create subscription for filtered collection.
        mutableSubs.add(seenBirds, {name: 'seenBirds'});
      },
    );
    numSubs = realm.subscriptions.length; // :remove:
  });

  return (
    <FlatList
      testID='seen-birds-list' // :remove:
      data={seenBirds}
      keyExtractor={item => item._id.toString()}
      renderItem={({item}) => <Text>{item._id.toString()}</Text>}
    />
  );
}
// :snippet-end:

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
});

test('Instantiate AppWrapper and test number of subscriptions', async () => {
  render(<AppWrapper />);

  // Get bird list. Waits until the list is rendered.
  const seenBirdsList = await screen.findByTestId('seen-birds-list', {
    // Timeout set to 2000 ms to account for variability in the time it takes
    // the sub sync behavior to work out.
    timeout: 2000,
  });

  expect(numSubs).toBe(1);
});
