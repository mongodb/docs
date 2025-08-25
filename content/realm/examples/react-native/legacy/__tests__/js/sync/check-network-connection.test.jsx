// :snippet-start: check-network-connection
import React, {useState, useEffect} from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
import {Text} from 'react-native';
// :remove-start:
const {RealmProvider} = SyncedRealmContext;
import {AppProvider, UserProvider} from '@realm/react';
import Realm from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp} from '@realm/react';

const APP_ID = 'js-flexible-oseso';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <CheckNetworkConnection />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

function RealmWrapper({children}) {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects('Profile'));
          },
        },
        onError: (_, err) => {
          console.log('error is:', err);
        },
      }}>
      {children}
    </RealmProvider>
  );
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app
      .logIn(Realm.Credentials.anonymous())
      .then(user => console.debug('logged in ', user.id));
  }, []);
  return <></>;
}

let higherScopedConnectionStates = [];
let higherScopedRealm;

// Note: have to create and wait for this promise because
// otherwise the test fails and exits before all the network connection notifications
// have resolved.
let promiseResolve;
const promise = new Promise(function (resolve) {
  promiseResolve = resolve;
});
// :remove-end:

function CheckNetworkConnection() {
  const realm = useRealm();
  higherScopedRealm = realm; // :remove:
  const [isConnected, setIsConnected] = useState(
    realm.syncSession?.isConnected(),
  );

  useEffect(() => {
    const connectionNotificationCallback = (newState, oldState) => {
      console.log('Current connection state: ' + newState);
      console.log('Previous connection state: ' + oldState);
      setIsConnected(realm.syncSession?.isConnected());
      // :remove-start:
      higherScopedConnectionStates.push(newState);
      higherScopedConnectionStates.length === 3 && promiseResolve(true);
      // :remove-end:
    };

    // Listen for changes to connection state
    realm.syncSession?.addConnectionNotification(
      connectionNotificationCallback,
    );

    // Remove the connection listener when component unmounts
    return () =>
      realm.syncSession?.removeConnectionNotification(
        connectionNotificationCallback,
      );
    // Run useEffect only when component mounts
  }, []);

  return (
    <Text>
      {isConnected ? 'Connected to Network' : 'Disconnected from Network'}
    </Text>
  );
}
// :snippet-end:

test('Test connection state', async () => {
  const {getByText} = render(<AppWrapper />);
  await waitFor(async () => {
    await getByText('Connected to Network');
    higherScopedRealm.syncSession?.pause();
    higherScopedRealm.syncSession?.resume();
  });
  await promise.then(res => {
    expect(higherScopedConnectionStates).toStrictEqual([
      'disconnected',
      'connecting',
      'connected',
    ]);
    expect(res).toBe(true);
  });
});
