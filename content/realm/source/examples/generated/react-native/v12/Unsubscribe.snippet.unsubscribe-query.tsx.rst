.. code-block:: typescript
   :emphasize-lines: 10, 13, 20-22

   import React, {useEffect, useState} from 'react';
   import {useRealm, useQuery} from '@realm/react';
   import {View, Text, Button} from 'react-native';

   import {Bird} from '../../models';
   import {Subscription} from 'realm/dist/bundle';

   export const Unsubscribe = () => {
     const realm = useRealm();
     const birds = useQuery(Bird); 

     const unsubscribeFromQuery = () => {
       birds.unsubscribe(); 
     };

     return (
       <View>
         <Button
           title="Unsubscribe"
           onPress={() => {
             unsubscribeFromQuery();
           }}
         />
       </View>
     );
   };
