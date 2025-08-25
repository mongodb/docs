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

import {Manufacturer, CarWithEmbed, Warranty} from '../../models';

export const EmbeddedRelationship = () => {
  const [embeddedCarModel, setEmbeddedCarModel] = useState('');
  const [carWarranty, setCarWarranty] = useState('');

  const realm = useRealm();
  const manufacturer = useQuery(Manufacturer)[0];
  const cars = useQuery(CarWithEmbed);

  // Create a manufacturer to add cars to. This is a hack to streamline
  // testing. Could also implement a UI flow to create a manufacturer, then
  // create cars.
  if (!manufacturer) {
    realm.write(() => {
      realm.create(Manufacturer, {
        _id: new BSON.ObjectID(),
        name: 'Nissan',
        cars: [],
        warranties: [
          {
            name: 'Premium',
            termLength: 12,
            cost: 500,
          },
          {
            name: 'SuperPremium',
            termLength: 12,
            cost: 750,
          },
        ] as Warranty[],
      });
    });
  }

  const getLinkedManufacturer = (car: CarWithEmbed): string => {
    const manufacturer = car.linkingObjects<Manufacturer>(
      'Manufacturer',
      'cars',
    )[0];

    return manufacturer.name;
  };

  const createRelationship = ({
    model,
    warrantyType,
  }: {
    model: string;
    warrantyType: string;
  }): void => {
    realm.write(() => {
      const thisCar = realm.create(CarWithEmbed, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
        // Realm does not support explicit creation of EmbeddedObject
        // so you must create it in the context of the parent object.
        warranty: {
          name: warrantyType,
          termLength: 12,
          cost: 500,
        } as Warranty,
      });

      manufacturer.cars.push(thisCar);
    });
  };

  return (
    <View>
      <Text>Embedded Relationship</Text>
      <TextInput
        testID={'embedded-model-input'}
        onChangeText={setEmbeddedCarModel}
        value={embeddedCarModel}
        placeholder="Car model"
        style={styles.textInput}
      />
      <TextInput
        testID={'embedded-warranty-input'}
        onChangeText={setCarWarranty}
        value={carWarranty}
        placeholder="Warranty type"
        style={styles.textInput}
      />

      {cars.length ? (
        <FlatList
          data={cars}
          keyExtractor={item => item._id.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <View testID="embedded-car">
              <Text testID="embedded-model">Model: {item.model}</Text>
              <Text testID="embedded-warranty">
                Car warranty: {item.warranty!.name}
              </Text>
              <Text testID="embedded-manufacturer">
                Manufacturer warranty: {getLinkedManufacturer(item)}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>No cars found!</Text>
      )}

      <Button
        testID="create-embedded-car"
        title="Create car"
        onPress={() => {
          createRelationship({
            model: embeddedCarModel,
            warrantyType: carWarranty,
          });
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
