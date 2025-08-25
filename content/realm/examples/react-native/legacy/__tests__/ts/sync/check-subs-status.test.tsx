// :snippet-start: check-sub-status
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
import {Bird} from '../Models/Bird';
// :remove-start:
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
import {App, Credentials} from 'realm';
import {useApp} from '@realm/react';
import {render, screen} from '@testing-library/react-native';

const APP_ID = 'js-flexible-oseso';

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
            onError: console.log,
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
  });

  // Returns state of all subscriptions, not individual subscriptions.
  // In this case, it's just the subscription for `Bird` objects where
  // `haveSeen` is true.
  const allSubscriptionState = realm.subscriptions.state;

  // :replace-start: {
  //    "terms": {
  //       "testID='sub-status'": ""
  //    }
  // }
  return (
    <View>
      <Text testID='sub-status'>
        Status of all subscriptions: {allSubscriptionState}
      </Text>
    </View>
  );
}
// :replace-end:
// :snippet-end:

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
});

test('Instantiate AppWrapper and test number of subscriptions', async () => {
  render(<AppWrapper />);

  // Get bird list. Waits until the list is rendered.
  const subStatusNode = await screen.findByTestId('sub-status', {
    // Timeout set to 2000 ms to account for variability in the time it takes
    // the sub sync behavior to work out.
    timeout: 2000,
  });
  const renderedSubStatus = subStatusNode.children[1];

  expect(renderedSubStatus).toBe('complete');
});
