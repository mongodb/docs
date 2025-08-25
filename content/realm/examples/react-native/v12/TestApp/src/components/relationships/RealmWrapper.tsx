import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {RealmProvider} from '@realm/react';

import {ToOneRelationship} from './ToOneRelationship';
import {ToManyRelationship} from './ToManyRelationship';
import {EmbeddedRelationship} from './EmbeddedRelationship';
import {InverseRelationship} from './InverseRelationship';

import {
  Manufacturer,
  ManufacturerInverse,
  ToOneManufacturer,
  ToManyManufacturer,
  Car,
  CarInverse,
  LinkedCar,
  CarWithEmbed,
  Warranty,
} from '../../models';

const realmModels: Realm.RealmObjectConstructor[] = [
  Manufacturer,
  ToOneManufacturer,
  ToManyManufacturer,
  ManufacturerInverse,
  Car,
  CarInverse,
  LinkedCar,
  CarWithEmbed,
  Warranty,
];

export const RelationshipExamples = () => {
  return (
    <ScrollView>
      <RealmProvider schema={realmModels} path="relationships.realm">
        <View style={styles.separator}>
          <ToOneRelationship />
        </View>
        <View style={styles.separator}>
          <ToManyRelationship />
        </View>
        <View style={styles.separator}>
          <EmbeddedRelationship />
        </View>
        <View style={styles.separator}>
          <InverseRelationship />
        </View>
      </RealmProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
