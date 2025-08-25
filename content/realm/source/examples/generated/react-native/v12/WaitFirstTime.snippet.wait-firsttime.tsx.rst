.. code-block:: typescript
   :emphasize-lines: 14-16, 24

   import React, {useEffect, useState} from 'react';
   import {BSON, WaitForSync} from 'realm';
   import {useRealm, useQuery} from '@realm/react';
   import {View, Text, Button, TextInput, FlatList} from 'react-native';

   import {Bird} from '../../models';
   import {Subscription} from 'realm/dist/bundle';

   export const WaitFirstTime = () => {
     const realm = useRealm();
     const [birdName, setBirdName] = useState('Change me!');

     // Get local birds that have been marked as "haveSeen".
     const seenBirds = useQuery(Bird, collection =>
       collection.filtered('haveSeen == true'),
     );
     const [seenBirdsSubscription, setSeenBirdsSubscription] =
       useState<Subscription | null>();

     useEffect(() => {
       const createSubscription = async () => {
         // Only wait for sync to finish on the initial sync.
         await seenBirds.subscribe({
           behavior: WaitForSync.FirstTime, 
           name: 'First time sync only',
         });
       };

       createSubscription().catch(console.error);

       // Get the subscription...
       const subscription = realm.subscriptions.findByName('First time sync only');

       // ... and set it to a stateful variable or manage it in `useEffect`.
       setSeenBirdsSubscription(subscription);
     }, []);

     return (
       // Work with the subscribed results list or modify the subscription...
       <></>
     );
   };
