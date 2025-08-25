.. code-block:: typescript

   import React, {useState} from 'react';
   import {Text, FlatList, View, Pressable, TextInput} from 'react-native';
   import {useRealm, useQuery} from '@realm/react';

   import {Profile} from '../../models';

   export const Update = () => {
     const realm = useRealm();
     const profiles = useQuery(Profile);
     const [profileToUpdate, setProfileToUpdate] = useState('');
     const [newProfileName, setNewProfileName] = useState('');

     const updateProfile = () => {
       const toUpdate = realm
         .objects(Profile)
         .filtered('name == $0', profileToUpdate);

       realm.write(() => {
         toUpdate[0].name = newProfileName;
       });
     };

     return (
       <View>
         <Text>Update</Text>

         {profiles.length ? (
           <View>
             <Text>Profiles: </Text>
             <FlatList
               scrollEnabled={false}
               data={profiles}
               horizontal={true}
               renderItem={({item}) => (
                 <Pressable
                   onPress={() => {
                     setProfileToUpdate(item.name);
                   }}>
                   <Text
                    >
                     {item.name}
                   </Text>
                 </Pressable>
               )}
               keyExtractor={item => item.name}
             />
           </View>
         ) : (
           <Text>🛑 No profiles found</Text>
         )}

         {profileToUpdate && (
           <TextInput
             style={styles.textInput}
             onChangeText={setNewProfileName}
             value={newProfileName}
             placeholder="New profile name..."
           />
         )}

         <Button
           title="Update profile"
           onPress={updateProfile}
         />
       </View>
     );
   };
