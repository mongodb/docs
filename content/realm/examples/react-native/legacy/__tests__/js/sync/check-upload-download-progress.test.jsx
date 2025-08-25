// :snippet-start: check-upload-download-progress
import React, {useEffect, useState} from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
import {Text} from 'react-native';
// :remove-start:
const {RealmProvider} = SyncedRealmContext;
import {AppProvider, UserProvider, useUser} from '@realm/react';
import Realm from 'realm';
import {render} from '@testing-library/react-native';
import {useApp} from '@realm/react';

const APP_ID = 'js-flexible-oseso';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <CheckUploadProgress />
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

let higherScopedRealm;
let higherScopePercentTransferred = 0;

// Note: have to create and wait for this promise because
// otherwise the test fails and exits before all the network connection notifications
// have resolved.
let promiseResolve;
const promise = new Promise(function (resolve) {
  promiseResolve = resolve;
});
let functionCalled = false;
// :remove-end:

function CheckUploadProgress() {
  const realm = useRealm();
  higherScopedRealm = realm; // :remove:
  const [uploadProgressPercent, setUploadProgressPercent] = useState(0);

  useEffect(() => {
    // :remove-start:
    // Add data on component first render to trigger progress notification callback
    // to run.
    if (!functionCalled) {
      realm.subscriptions.update((subs, realm) => {
        subs.add(realm.objects('Profile'));
      });
      realm.subscriptions.waitForSynchronization().then(() => {
        realm.write(() => {
          realm.create('Profile', {
            _id: new Realm.BSON.UUID(),
            name: 'joey',
          });
          realm.create('Profile', {
            _id: new Realm.BSON.UUID(),
            name: 'ross',
          });
        });
        functionCalled = true;
      });
    }
    // :remove-end:
    const progressNotificationCallback = (transferred, transferable) => {
      // Convert decimal to percent with no decimals
      // (e.g. 0.6666... -> 67)
      const percentTransferred =
        parseFloat((transferred / transferable).toFixed(2)) * 100;

      setUploadProgressPercent(percentTransferred);
      // :remove-start:
      higherScopePercentTransferred = percentTransferred;
      if (percentTransferred === 100) {
        promiseResolve(true);
      }
      // :remove-end:
    };

    // Listen for changes to connection state
    realm.syncSession?.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotificationCallback,
    );

    // Remove the connection listener when component unmounts
    return () =>
      realm.syncSession?.removeProgressNotification(
        progressNotificationCallback,
      );
    // Run useEffect only when component mounts
  }, []);

  return <Text>Percent Uploaded: {uploadProgressPercent} %</Text>;
}
// :snippet-end:

afterEach(() => {
  Realm.deleteFile({path: higherScopedRealm.path});
});
test('Test percent uploaded state', async () => {
  render(<AppWrapper />);

  const res = await promise;
  expect(res).toBe(true);
  expect(higherScopePercentTransferred).toBe(100);
});
