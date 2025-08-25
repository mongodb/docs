import {StyleSheet, View, ScrollView} from 'react-native';

import {Create} from '../Create';
import {Read} from '../Read';
import {Update} from '../Update';
import {Delete} from '../Delete';

// :snippet-start: qs-realm-provider
import React from 'react';
import {RealmProvider} from '@realm/react';
// Import your models
import {Profile} from '../../../models';

export const AppWrapper = () => {
  return (
    <RealmProvider schema={[Profile]}>
      <RestOfApp />
    </RealmProvider>
  );
};
// :snippet-end:

const RestOfApp = () => {
  return (
    <ScrollView>
      <View style={styles.separator}>
        <Read />
      </View>
      <View style={styles.separator}>
        <Create />
      </View>
      <View style={styles.separator}>
        <Update />
      </View>
      <View style={styles.separator}>
        <Delete />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
