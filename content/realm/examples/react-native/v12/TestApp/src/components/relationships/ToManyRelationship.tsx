import React, {useState} from 'react';
import {BSON} from 'realm';
import {useQuery, useRealm} from '@realm/react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

import {ToManyManufacturer, LinkedCar} from '../../models';

export const ToManyRelationship = () => {
  const [toManyCarModel, setToManyCarModel] = useState('');

  const realm = useRealm();
  const toManyManufacturer = useQuery(ToManyManufacturer)[0];
  const cars = useQuery(LinkedCar);

  // Create a manufacturer to add cars to. This is a hack to streamline
  // testing. Could also implement a UI flow to create a manufacturer, then
  // create cars.
  if (!toManyManufacturer) {
    realm.write(() => {
      realm.create(ToManyManufacturer, {
        _id: new BSON.ObjectID(),
        name: 'Nissan',
        cars: [],
      });
    });
  }

  // :snippet-start: obtain-inverse-relationship-dynamically
  const getLinkedManufacturer = (car: LinkedCar): string => {
    const manufacturer = car.linkingObjects<ToManyManufacturer>(
      'ToManyManufacturer',
      'cars',
    )[0];

    // Returns 'Nissan', as only one manufacturer is linked
    // to this car object.
    return manufacturer.name;
  };
  // :snippet-end:

  const createRelationship = (model: string): void => {
    realm.write(() => {
      const thisCar = realm.create(LinkedCar, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
      });

      toManyManufacturer.cars.push(thisCar);
    });
  };

  return (
    <View>
      <Text>To-Many Relationship</Text>
      <TextInput
        testID={'to-many-model-input'}
        onChangeText={setToManyCarModel}
        value={toManyCarModel}
        placeholder="Car model"
        style={styles.textInput}
      />

      {cars.length ? (
        <FlatList
          data={cars}
          keyExtractor={item => item._id.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <View testID="car">
              <Text testID="model">Model: {item.model}</Text>
              <Text testID="manufacturer">
                Manufacturer: {getLinkedManufacturer(item)}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>No cars found!</Text>
      )}

      <Button
        testID="create-to-many-car"
        title="Create car"
        onPress={() => {
          createRelationship(toManyCarModel);
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
