// :snippet-start: get-subscriptions
import React, {useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
import {Bird} from '../Models/Bird';
// :remove-start:
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
import {App, Credentials} from 'realm';
import {useApp} from '@realm/react';
import {render, screen, within} from '@testing-library/react-native';

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
            onError: (_session, error) => {
              console.debug(_session, error);
            },
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(Bird), {name: 'all birds'});
              },
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

  // Pass object model to useQuery and filter results.
  // This does not create a subscription.
  const seenBirds = useQuery(Bird, birds => {
    return birds.filtered('haveSeen == true');
  });

  const [subscriptions, setSubcriptions] = useState<
    App.Sync.SubscriptionSet | undefined
  >();

  useEffect(() => {
    const createSubscription = async () => {
      // Create subscription for filtered results.
      await realm.subscriptions.update(mutableSubs => {
        mutableSubs.add(seenBirds, {name: 'seen birds'});
      });
    };

    createSubscription().catch(console.error);

    // Set to state variable.
    setSubcriptions(realm.subscriptions);
  }, []);

  return (
    <FlatList
      testID='sub-list' // :remove:
      data={subscriptions}
      keyExtractor={subscription => subscription.id.toString()}
      renderItem={({item}) => <Text>{item.name}</Text>}
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
  const subListNode = await screen.findByTestId('sub-list', {
    // Timeout set to 2000 ms to account for variability in the time it takes
    // the sub sync behavior to work out.
    timeout: 2000,
  });
  const allBirdsNode = await within(subListNode).findByText('all birds');
  const seenBirdsNode = await within(subListNode).findByText('seen birds');

  expect(allBirdsNode.children[0]).toBe('all birds');
  expect(seenBirdsNode.children[0]).toBe('seen birds');
});
