.. code-block:: typescript

   import React, {useState} from 'react';
   import {Text, TextInput, View} from 'react-native';
   import {BSON} from 'realm';
   import {useRealm} from '@realm/react';
   import {Profile} from '../../models';

   export const Create = () => {
     const realm = useRealm();
     const [profileName, setProfileName] = useState('');

     const addProfile = () => {
       realm.write(() => {
         realm.create(Profile, {
           _id: new BSON.ObjectId(),
           name: profileName,
         });
       });
     };

     return (
       <View>
         <Text>Create</Text>

         <TextInput
          
           onChangeText={setProfileName}
           value={profileName}
           placeholder="Profile name..."
         />

         <Button
           title="Add Profile"
           onPress={addProfile}
         />
       </View>
     );
   };
