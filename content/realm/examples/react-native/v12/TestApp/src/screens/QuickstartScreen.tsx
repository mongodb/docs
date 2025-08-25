import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppWrapper} from '../components/quickstart/nonsync/RealmWrapper';
import {AppWrapperSync} from '../components/quickstart/sync/RealmWrapperSync';

import {
  QuickstartStackParamList,
  QuickstartHomeProps,
} from '../navigation/types';

const Stack = createStackNavigator<QuickstartStackParamList>();

export const QuickstartScreen = () => {
  return (
    <Stack.Navigator initialRouteName="QuickstartHome">
      <Stack.Screen
        name="QuickstartHome"
        component={QuickstartHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuickstartSync"
        component={AppWrapperSync}
      />
      <Stack.Screen
        name="QuickstartNoSync"
        component={AppWrapper}
      />
    </Stack.Navigator>
  );
};

const QuickstartHome = ({navigation}: QuickstartHomeProps) => {
  return (
    <View style={styles.globalScreen}>
      <Text>This is the Quickstart section</Text>
      <View style={styles.exampleList}>
        <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Quick Start Sync</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('QuickstartSync');
            }}
          />
        </View>
        <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Quick Start</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('QuickstartNoSync');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalScreen: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  exampleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  exampleTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  subscriptionExample: {
    maxWidth: '45%',
    minWidth: '35%',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginVertical: 8,
    marginHorizontal: 3,
  },
});
