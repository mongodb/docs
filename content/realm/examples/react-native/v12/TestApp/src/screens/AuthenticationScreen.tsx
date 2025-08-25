import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginExample} from '../components/authentication/login/RealmWrapper';
import {LinkIdentities} from '../components/authentication/link-identities/LinkIdentities';
import {ApiKeyAuth} from '../components/authentication/api-keys/ApiKeys';

import {AuthenticationStackParamList} from '../navigation/types';
import {AuthenticationHomeProps} from '../navigation/types';

const Stack = createStackNavigator<AuthenticationStackParamList>();

export const AuthenticationScreen = () => {
  return (
    <Stack.Navigator initialRouteName="AuthenticationHome">
      <Stack.Screen
        name="AuthenticationHome"
        component={AuthenticationHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginExample} />
      <Stack.Screen name="LinkIdentities" component={LinkIdentities} />
      <Stack.Screen name="ApiKeyAuth" component={ApiKeyAuth} />
    </Stack.Navigator>
  );
};

const AuthenticationHome = ({navigation}: AuthenticationHomeProps) => {
  return (
    <View style={styles.globalScreen}>
      <Text>This is the Log in section</Text>
      <View style={styles.exampleList}>
        <View style={styles.example}>
          <Text style={styles.exampleTitle}>Log in</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </View>
      <Text>This is Link Identities section</Text>
      <View style={styles.exampleList}>
        <View style={styles.example}>
          <Text style={styles.exampleTitle}>Link identities</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('LinkIdentities');
            }}
          />
        </View>
      </View>
      <Text>This is API Key Auth section</Text>
      <View style={styles.exampleList}>
        <View style={styles.example}>
          <Text style={styles.exampleTitle}>API Key Auth</Text>
          <Button
            title={'Check it out'}
            onPress={() => {
              navigation.navigate('ApiKeyAuth');
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
  example: {
    maxWidth: '45%',
    minWidth: '35%',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginVertical: 8,
    marginHorizontal: 3,
  },
});
