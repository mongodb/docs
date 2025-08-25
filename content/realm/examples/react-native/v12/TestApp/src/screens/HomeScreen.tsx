import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={styles.globalScreen}>
      <Text>Welcome to the Realm React Native SDK test app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  globalScreen: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
});
