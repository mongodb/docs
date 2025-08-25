import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: (() => void) | (() => Promise<void>) | null | undefined;
  testID?: string | undefined;
};

export const Button = ({title, onPress, testID}: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress} testID={testID}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3F51B5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
