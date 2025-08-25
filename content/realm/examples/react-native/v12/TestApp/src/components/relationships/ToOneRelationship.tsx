import React, {useState} from 'react';
import {BSON} from 'realm';
import {useQuery, useRealm} from '@realm/react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

import {ToOneManufacturer, Car} from '../../models';

export const ToOneRelationship = () => {
  const [toOneCarModel, setToOneCarModel] = useState('');

  const realm = useRealm();
  const toOneManufacturer = useQuery(ToOneManufacturer)[0];

  const createRelationship = (model: string): void => {
    realm.write(() => {
      const thisCar = realm.create(Car, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
      });

      realm.create(ToOneManufacturer, {
        _id: new BSON.ObjectID(),
        name: 'Nissan',
        car: thisCar,
      });
    });
  };

  const removeAllObjects = (): void => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  return (
    <View>
      <Text>To-One Relationship</Text>
      <TextInput
        testID={'to-one-model-input'}
        onChangeText={setToOneCarModel}
        value={toOneCarModel}
        placeholder="Car model"
        style={styles.textInput}
      />

      {toOneManufacturer && toOneManufacturer.car && (
        <Text testID="car-model">
          Manufacturer car: {toOneManufacturer.car.model}
        </Text>
      )}

      <Button
        testID="create-to-one-car"
        title="Create car"
        onPress={() => {
          createRelationship(toOneCarModel);
        }}
      />
      <Button
        testID="remove-all-objects"
        title="Remove all objects"
        onPress={() => {
          removeAllObjects();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
