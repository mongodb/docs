/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef} from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import LoadingSpinner from './components/LoadingSpinner';
import LoginComponent from './components/LoginComponent';
import App from './App';
import SyncedApp from './SyncedApp';

import {appId} from '../realm.json';

const app = new Realm.App({id: appId});

// :snippet-start: import-task-context
import TaskContext from './models/Task';
const {RealmProvider} = TaskContext;
// :snippet-end:

// :snippet-start: wrap-app-within-realm-provider
function AppWrapper() {
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
// :snippet-end:

const logIn = async () => await app.logIn(Realm.Credentials.anonymous());

// :snippet-start: dynamically-update-realm-config
// :replace-start: {
//   "terms": {
//     "AppWrapper2": "AppWrapper"
//   }
// }
function AppWrapper2() {
  // :remove-start:
  useEffect(() => {
    logIn();
  });
  // :remove-end:
  const syncConfig = {
    user: app?.currentUser,
    partitionValue: 'ExpoTemplate',
  };

  // :uncomment-start:
  // return (
  //   <RealmProvider sync={syncConfig} fallback={() => <LoadingSpinner />}>
  //     <App />
  //   </RealmProvider>
  // );
  // :uncomment-end:
  // :remove-start:
  return (
    <RealmProvider
      sync={syncConfig}
      deleteRealmIfMigrationNeeded={false}
      fallback={<LoadingSpinner />}>
      <App />
    </RealmProvider>
  );
  // :remove-end:
}
// :replace-end:
// :snippet-end:

// :snippet-start: wrap-app-within-app-provider
// :replace-start: {
//   "terms": {
//     "AppWrapper3": "AppWrapper"
//   }
// }
// :uncomment-start:
// import { AppProvider } from '@realm/react'
// :uncomment-end:

function AppWrapper3() {
  return (
    <AppProvider id={appId}>
      <RealmProvider>
        <App />
      </RealmProvider>
    </AppProvider>
  );
}
// :replace-end:
// :snippet-end:

// :snippet-start: wrap-app-within-app-and-user-provider
// :replace-start: {
//   "terms": {
//     "AppWrapper4": "AppWrapper",
//     "SyncedApp": "App"
//   }
// }
// :uncomment-start:
// import { AppProvider, UserProvider } from '@realm/react'
// :uncomment-end:

const AppWrapper4 = () => {
  // :uncomment-start:
  // return (
  //   <AppProvider id={appId}>
  //     <UserProvider fallback={LoginComponent}>
  //       {/* After login, user will be automatically populated in realm configuration */}
  //       <RealmProvider
  //         sync={{partitionValue: 'SamplePartition'}}>
  //         <App />
  //       </RealmProvider>
  //     </UserProvider>
  //   </AppProvider>
  // );
  // :uncomment-end:
  // :remove-start:
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={LoginComponent}>
        {/* After login, user will be automatically populated in realm configuration */}
        <RealmProvider
          sync={{partitionValue: 'SamplePartition'}}
          deleteRealmIfMigrationNeeded={false}>
          <SyncedApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
  // :remove-end:
};
// :replace-end:
// :snippet-end:

// You can test out the various AppWrappers by uncommenting the desired export below
// export default AppWrapper;
// export default AppWrapper2;
// export default AppWrapper3;
export default AppWrapper4;
