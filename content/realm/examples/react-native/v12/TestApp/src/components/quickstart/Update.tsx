import {StyleSheet} from 'react-native';
import {Button} from '../utility-components/Button';
// :snippet-start: qs-update
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

  // :replace-start: {
  //    "terms": {
  //       " style={styles.heading}": "",
  //       " style={styles.profileName}": ""
  //    }
  // }
  return (
    <View>
      <Text style={styles.heading}>Update</Text>

      {profiles.length ? (
        <View>
          <Text>Profiles: </Text>
          <FlatList
            scrollEnabled={false}
            data={profiles}
            horizontal={true}
            renderItem={({item}) => (
              <Pressable
                // :remove-start:
                style={[
                  profileToUpdate == item.name ? styles.selected : null,
                  styles.profileItem,
                ]}
                // :remove-end:
                onPress={() => {
                  setProfileToUpdate(item.name);
                }}>
                <Text
                  testID="profile-to-update" // :remove:
                  style={styles.profileName}>
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
          testID="update-input" // :remove:
          style={styles.textInput}
          onChangeText={setNewProfileName}
          value={newProfileName}
          placeholder="New profile name..."
        />
      )}

      <Button
        testID="update-profile" // :remove:
        title="Update profile"
        onPress={updateProfile}
      />
    </View>
  );
  // :replace-end:
};
// :snippet-end:

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  textInput: {
    marginVertical: 8,
    backgroundColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  profileItem: {
    borderWidth: 1,
    borderRadius: 8,
    maxWidth: 150,
    marginHorizontal: 4,
  },
  profileName: {
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  selected: {
    backgroundColor: 'green',
  },
});
