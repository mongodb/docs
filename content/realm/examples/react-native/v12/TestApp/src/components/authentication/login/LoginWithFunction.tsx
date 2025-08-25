import React, {useState} from 'react';
import {useAuth} from '@realm/react';
import {StyleSheet, View, TextInput} from 'react-native';

import {Button} from '../../utility-components/Button';

// :snippet-start: login-function
export const LogInWithFunction = () => {
  const {logInWithFunction, result} = useAuth();
  // :remove-start:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // :remove-end:

  const performFunctionLogin = async (email: string, password: string) => {
    // Pass arbitrary information to the Atlas function configured
    // for your App's Custom Function provider.
    logInWithFunction({email, password});
  };

  // Handle `result`...
  // :remove-start:
  return (
    <View style={styles.section}>
      <View>
        <TextInput
          testID="email-input-function"
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="email..."
        />
        <TextInput
          testID="password-input-function"
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="password..."
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          testID="log-in-function"
          title="Log in with function"
          onPress={() => {
            performFunctionLogin(email, password);
          }}
        />
      </View>
    </View>
  );
  // :remove-end:
};
// :snippet-end:

const styles = StyleSheet.create({
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
    paddingVertical: 12,
    width: '100%',
  },
  textInput: {
    backgroundColor: '#C5CAE9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
});
