// :replace-start: {
//   "terms": {
//     "SubscriptionRealmContext": "RealmContext"
//   }
// }
// :snippet-start: initial-subscriptions
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
// get realm context from createRealmContext()
import {SubscriptionRealmContext} from '../RealmConfig';
import {Text, FlatList} from 'react-native';
// :remove-start:
import {useEffect} from 'react';
import {App, Credentials} from 'realm';
import {useApp} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';

const APP_ID = 'js-flexible-oseso';

let numSubs: number;

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}
// :remove-end:

const {RealmProvider, useQuery} = SubscriptionRealmContext;

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Turtle'));
              },
            },
            onError: console.log,
          }}>
          <SubscriptionManager />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

function SubscriptionManager() {
  // :remove-start:
  // Test logic only in this section.
  const {useRealm} = SubscriptionRealmContext;
  const realm = useRealm();
  const allSubscriptions = realm.subscriptions;

  allSubscriptions.length ? (numSubs = allSubscriptions.length) : (numSubs = 0);
  // :remove-end:

  // Pass object model to useQuery to get all objects of type `Turtle`.
  // These results automatically update with changes from other devices
  // because we created a subscription with `initialSubscriptions`.
  const allTurtles = useQuery('Turtle');

  return (
    <FlatList
      data={allTurtles}
      keyExtractor={turtle => turtle._id.toString()}
      renderItem={({item}) => <Text>{item._id}</Text>}
    />
  );
}
// :snippet-end:
// :replace-end:

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
});

test('Instantiate AppWrapper and test number of subscriptions', async () => {
  render(<AppWrapper />);
  await waitFor(
    () => {
      expect(numSubs).toBe(1);
    },
    {timeout: 2000},
  );
});
