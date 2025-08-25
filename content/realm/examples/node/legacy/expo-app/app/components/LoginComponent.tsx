import React, {useState} from 'react';
import Realm from 'realm';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';

// :snippet-start: useApp-hook-usage
// :replace-start: {
//   "terms": {
//     "email@email.com": "",
//     "Email123!": ""
//   }
// }
import {useApp} from '@realm/react';

function LoginComponent({}) {
  const [email, setEmail] = useState('email@email.com');
  const [password, setPassword] = useState('Email123!');

  const app = useApp();

  const signIn = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
  };
  // ...
  // :remove-start:
  const onPressSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <Input
          autoCapitalize="none"
          defaultValue={email}
          onChangeText={setEmail}
          placeholder="email"
        />
        <Input
          defaultValue={password}
          onChangeText={setPassword}
          placeholder="password"
        />
        <Button
          title="Log In"
          buttonStyle={styles.mainButton}
          onPress={onPressSignIn}
        />
      </View>
    </SafeAreaProvider>
  );
  // :remove-end:
}
// :replace-end:
// :snippet-end:

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  mainButton: {
    width: 350,
  },
});

export default LoginComponent;
