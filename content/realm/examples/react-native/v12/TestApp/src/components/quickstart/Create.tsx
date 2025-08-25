import {StyleSheet} from 'react-native';
import {Button} from '../utility-components/Button';
// :snippet-start: qs-create
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

  // :replace-start: {
  //    "terms": {
  //       " style={styles.heading}": "",
  //       " style={styles.textInput}": ""
  //    }
  // }
  return (
    <View>
      <Text style={styles.heading}>Create</Text>

      <TextInput
        testID="create-input" // :remove:
        style={styles.textInput}
        onChangeText={setProfileName}
        value={profileName}
        placeholder="Profile name..."
      />

      <Button
        testID="create-profile" // :remove:
        title="Add Profile"
        onPress={addProfile}
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
});
