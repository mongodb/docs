import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {useAuth, useEmailPasswordAuth} from '@realm/react';

import {ApiKey, LoginManagerProps, RegisterButtonProps} from '../../types';

export const LoginManager = ({apiKey}: LoginManagerProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {logIn} = useEmailPasswordAuth();
  const {logInWithApiKey} = useAuth();

  const performLogin = () => {
    logIn({email, password});
  };

  // :snippet-start: api-key-login
  const loginApiKeyUser = async (apiKey: ApiKey) => {
    try {
      logInWithApiKey(apiKey!.key);
    } catch (error) {
      console.log(error);
    }
  };
  // :snippet-end:

  return (
    <View>
      {apiKey ? (
        <View>
          <Text>API key found!</Text>
          <Text testID="key-name-result">
            • {apiKey.name} | {apiKey._id}
          </Text>
          <View style={styles.buttonGroup}>
            <Pressable
              testID="login-api-key-button"
              style={styles.button}
              onPress={() => {
                loginApiKeyUser(apiKey);
              }}>
              <Text style={styles.buttonText}>Log in with API key</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            testID="email-input"
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholder="email..."
          />
          <TextInput
            testID="password-input"
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="password..."
          />
          <View style={styles.buttonGroup}>
            <Pressable
              testID="login-button"
              style={styles.button}
              onPress={performLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            <RegisterButton
              email={email}
              password={password}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const RegisterButton = ({email, password}: RegisterButtonProps) => {
  const {register} = useEmailPasswordAuth();

  const performRegistration = async () => {
    register({email, password});
  };

  return (
    <Pressable
      testID="register-button"
      style={styles.button}
      onPress={performRegistration}>
      <Text style={styles.buttonText}>Register</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  section: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#C5CAE9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  inputGroup: {
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3F51B5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#F3A6C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    opacity: 0.5,
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
