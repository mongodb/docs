.. code-block:: typescript

   import React, {useState} from 'react';
   import {Text, FlatList, View, Pressable} from 'react-native';
   import {useRealm, useQuery} from '@realm/react';
   import {Profile} from '../../models';

   export const Delete = () => {
     const realm = useRealm();
     const profiles = useQuery(Profile);
     const [profileToDelete, setProfileToDelete] = useState('');

     const deleteProfile = () => {
       const toDelete = realm
         .objects(Profile)
         .filtered('name == $0', profileToDelete);

       realm.write(() => {
         realm.delete(toDelete);
       });
     };

     return (
       <View>
         <Text>Delete</Text>

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
                     setProfileToDelete(item.name);
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

         <Button
           title="Delete profile"
           onPress={deleteProfile}
         />
       </View>
     );
   };
