.. code-block:: typescript

   import React from 'react';
   import {AppProvider, UserProvider} from '@realm/react';

   // Fallback log in component that's defined in another file.
   import {LogIn} from './Login';

   export const LoginExample = () => {
     return (
       <ScrollView>
         <AppProvider id={APP_ID}>
           {/* If there is no authenticated user, mount the
            `fallback` component. When user successfully
             authenticates, the app unmounts the `fallback`
             component (in this case, the `LogIn` component). */}
           <UserProvider fallback={LogIn}>
             {/* Components inside UserProvider have access
               to the user. These components only mount if
               there's an authenticated user. */}
             <UserInformation />
           </UserProvider>
         </AppProvider>
       </ScrollView>
     );
   };
