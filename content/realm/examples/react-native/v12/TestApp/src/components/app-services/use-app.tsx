// :snippet-start: app-config-imports
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
// :snippet-end:
// :snippet-start: import-use-app
// :uncomment-start:
//import React from 'react';
// :uncomment-end:
import {useApp} from '@realm/react';
// :snippet-end:
import {useAuth} from '@realm/react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {APP_ID} from '../../../appServicesConfig';

// :snippet-start: app-config
export const AppWithAuthHook = () => {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={LogIn}>
          <MyApp />
        </UserProvider>
      </AppProvider>
    </View>
  );
};
// :snippet-end:

const LogIn = () => {
  const {logInWithAnonymous} = useAuth();

  return (
    <View>
      <Text>No one is logged in yet.</Text>
      <Pressable
        testID="log-in"
        style={styles.button}
        onPress={logInWithAnonymous}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
};

// :snippet-start: use-app
function MyApp() {
  const app = useApp();
  // Proceed to app logic...
  // :remove-start:
  return (
    <Text testID="logged-in-user-id">
      "Logged in as user with ID: {app.currentUser?.id}"
    </Text>
  );
  // :remove-end:
}
// :snippet-end:

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
