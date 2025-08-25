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

import {ManufacturerInverse, CarInverse} from '../../models';

export const InverseRelationship = () => {
  const [inverseCarModel, setInverseCarModel] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');

  const realm = useRealm();
  const testCollections = useQuery(ManufacturerInverse);
  // TODO: Can't get linking objects property syntax working.
  // Investgate this as part of DOCSP-33344
  // https://jira.mongodb.org/browse/DOCSP-33344
  // const testManufacturer = testCollections.filtered(
  //   '@links.ManufacturerInverse.CarInverse.model == Sentra',
  // );
  const manufacturerInverse = useQuery(ManufacturerInverse)[0];
  const cars = useQuery(CarInverse);

  const getManufacturerId = (car: CarInverse): string => {
    const carManufacturer = car.manufacturer[0];

    return carManufacturer._id.toString();
  };

  const createManufacturer = (): void => {
    realm.write(() => {
      realm.create(ManufacturerInverse, {
        _id: new BSON.ObjectID(manufacturerId),
        name: 'Nissan',
        cars: [],
      });
    });
  };

  const createCar = (model: string): void => {
    if (!manufacturerInverse) {
      return;
    }

    realm.write(() => {
      const thisCar = realm.create(CarInverse, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
      });

      manufacturerInverse.cars.push(thisCar);
    });
  };

  return (
    <View>
      <Text>Inverse Relationship</Text>
      <Text testID="inverse-manufacturer-id-original" selectable={true}>
        Test id: 313233343536373839313233
      </Text>
      <TextInput
        testID={'inverse-model-input'}
        onChangeText={setInverseCarModel}
        value={inverseCarModel}
        placeholder="Car model"
        style={styles.textInput}
      />
      <TextInput
        testID={'inverse-id-input'}
        onChangeText={setManufacturerId}
        value={manufacturerId}
        placeholder="Manufacturer Id"
        style={styles.textInput}
      />

      {cars.length ? (
        <FlatList
          data={cars}
          keyExtractor={item => item._id.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <View testID="inverse-car">
              <Text testID="inverse-model">Model: {item.model}</Text>
              <Text testID="inverse-manufacturer-id">
                Manufacturer id: {getManufacturerId(item)}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>No cars found!</Text>
      )}

      <Button
        testID="create-inverse-car"
        title="Create car"
        onPress={() => {
          createCar(inverseCarModel);
        }}
      />
      <Button
        testID="create-inverse-manufacturer"
        title="Create manufacturer"
        onPress={() => {
          createManufacturer();
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
