// :replace-start: {
//   "terms": {
//     "SubscriptionRealmContext": "RealmContext"
//   }
// }
// :snippet-start: remove-subscriptions-full
import {useEffect} from 'react';
// get realm context from createRealmContext()
import {SubscriptionRealmContext} from '../RealmConfig';
// :remove-start:
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
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
const {RealmProvider} = SubscriptionRealmContext;

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.removeAll();
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

// :remove-end:

const {useRealm} = SubscriptionRealmContext;

function SubscriptionManager() {
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Remove subscription for object type `Turtle`,
      // which we added in `initialSubscriptions`.
      mutableSubs.removeByObjectType('Turtle');
    });
    numSubs = realm.subscriptions.length; //:remove:
  });

  return (
    // ...
    <></> // :remove:
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
    async () => {
      await new Promise(resolve =>
        setTimeout(() => {
          expect(numSubs).toBe(0);
          resolve(true);
        }, 1000),
      );
    },
    {timeout: 2000},
  );
});
