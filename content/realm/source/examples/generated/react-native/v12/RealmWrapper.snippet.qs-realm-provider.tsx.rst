.. code-block:: typescript

   import React from 'react';
   import {RealmProvider} from '@realm/react';
   // Import your models
   import {Profile} from '../../../models';

   export const AppWrapper = () => {
     return (
       <RealmProvider schema={[Profile]}>
         <RestOfApp />
       </RealmProvider>
     );
   };
