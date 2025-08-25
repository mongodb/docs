import {StyleSheet} from 'react-native';
import {Button} from '../utility-components/Button';
// :snippet-start: qs-delete
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
  // :remove-start:
  const deleteAllProfiles = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };
  // :remove-end:

  // :replace-start: {
  //    "terms": {
  //       " style={styles.heading}": "",
  //       " style={styles.profileName}": ""
  //    }
  // }
  return (
    <View>
      <Text style={styles.heading}>Delete</Text>

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
                  profileToDelete == item.name ? styles.selected : null,
                  styles.profileItem,
                ]}
                // :remove-end:
                onPress={() => {
                  setProfileToDelete(item.name);
                }}>
                <Text
                  testID="profile-to-delete" // :remove:
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

      <Button
        testID="delete-profile" // :remove:
        title="Delete profile"
        onPress={deleteProfile}
      />
      {/* :remove-start: */}
      <Button
        testID="remove-all-objects"
        title="Delete all"
        onPress={deleteAllProfiles}
      />
      {/* :remove-end: */}
    </View>
  );
  // :replace-end:
};
// :snippet-end:

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
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
