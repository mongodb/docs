import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {SubscribeApiExamples} from '../components/subscribe-api/RealmWrapper';

import {SubscriptionStackParamList} from '../navigation/types';
import {SubscriptionHomeProps} from '../navigation/types';

const Stack = createStackNavigator<SubscriptionStackParamList>();

export const SubscriptionScreen = () => {
  return (
    <Stack.Navigator initialRouteName="SubscriptionHome">
      <Stack.Screen
        name="SubscriptionHome"
        component={SubscriptionHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SubscribeApi" component={SubscribeApiExamples} />
    </Stack.Navigator>
  );
};

const SubscriptionHome = ({navigation}: SubscriptionHomeProps) => {
  return (
    <View style={styles.globalScreen}>
      <Text>This is the Subscriptions section</Text>
      <View style={styles.exampleList}>
        <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Subscribe API</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('SubscribeApi');
            }}
          />
        </View>
        {/* <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Subscribe API</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('SubscribeApi');
            }}
          />
        </View>
        <View style={styles.subscriptionExample}>
          <Text style={styles.exampleTitle}>Subscribe API</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('SubscribeApi');
            }}
          />
        </View> */}
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
