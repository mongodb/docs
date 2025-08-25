.. code-block:: typescript

   import React from 'react';
   import {Credentials} from 'realm';
   import {RealmProvider, AppProvider, UserProvider, useApp} from '@realm/react';
   // Import your models
   import {Profile} from '../../../models';

   // Expose a sync realm
   export function AppWrapperSync() {
     return (
       <AppProvider id={APP_ID}>
         <UserProvider fallback={LogIn}>
           <RealmProvider
             schema={[Profile]}
             sync={{
               flexible: true,
               onError: (_session, error) => {
                 console.log(error);
               },
               initialSubscriptions: {
                 update(subs, realm) {
                   subs.add(realm.objects('Profile'));
                 },
                 rerunOnOpen: true,
               },
             }}
             fallback={fallback}>
             <RestOfApp />
           </RealmProvider>
         </UserProvider>
       </AppProvider>
     );
   }
