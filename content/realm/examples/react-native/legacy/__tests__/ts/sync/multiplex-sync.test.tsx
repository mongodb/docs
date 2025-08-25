// :snippet-start: multiplex-sync
import React, {useEffect} from 'react';
import {Context} from '../RealmConfig';
import {AppProvider, UserProvider, useUser, useApp, Realm} from '@realm/react';
// :remove-start:
const {RealmProvider} = Context;
import {render, waitFor} from '@testing-library/react-native';
const APP_ID = 'js-flexible-oseso';
const testId = 'test-multiplex-sync-session';

// :remove-end:
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <RestOfApp />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

type RealmWrapperProps = {
  children: React.ReactNode;
};

function RealmWrapper({children}: RealmWrapperProps) {
  const app = useApp();
  Realm.App.Sync.enableSessionMultiplexing(app);

  return <RealmProvider sync={{flexible: true}}>{children}</RealmProvider>;
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app
      .logIn(Realm.Credentials.anonymous())
      .then(user => console.debug('logged in ', user.id));
  }, []);
  return <></>;
}

let hasRealmBeenOpened = false;

function RestOfApp() {
  hasRealmBeenOpened = true;
  return <></>;
}

test('Multiplex sync', async () => {
  render(<AppWrapper />);
  await waitFor(async () => {
    expect(hasRealmBeenOpened).toBe(true);
  });
});
