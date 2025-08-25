import React, {useState, Dispatch, SetStateAction} from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {useAuth} from '@realm/react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useApp} from '@realm/react';
import {EDGE_APP_ID as APP_ID} from '../../../appServicesConfig';
import 'realm/experimental/base-url';

// TODO: Base URL updates aren't well supported in React Native yet. When they
// are, use this file to test. Will need to add it to the App's nav.
// Two component here: one for static and one for dynamic base URL.

const SetCustomBaseUrl = () => {
  const customBaseURL = 'https://example.com';

  return (
    <View>
      <AppProvider
        id={APP_ID}
        baseUrl={customBaseURL}>
        <UserProvider fallback={LogIn}>
          <App />
        </UserProvider>
      </AppProvider>
    </View>
  );
};

const App = () => {
  const app = useApp();

  return (
    <View>
      {/* TODO: Uncomment when @realm/react supports it */}
      {/* <Text>{app.baseUrl}</Text> */}
    </View>
  );
};

const ChangeBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState('');

  return (
    <View>
      <AppProvider
        id={APP_ID}
        baseUrl={baseUrl}>
        <UserProvider fallback={LogIn}>
          <MyApp
            baseUrl={baseUrl}
            setBaseURL={setBaseUrl}
          />
        </UserProvider>
      </AppProvider>
    </View>
  );
};

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

interface MyAppProps {
  baseUrl: string;
  setBaseURL: Dispatch<SetStateAction<string>>;
}

function MyApp({baseUrl, setBaseURL}: MyAppProps) {
  const app = useApp();

  const handleBaseUrlUpdate = (newBaseUrl: string) => {
    // TODO: Uncomment when @realm/react supports it
    // app.updateBaseUrl(newBaseUrl);
  };

  return (
    <View>
      <Text testID="logged-in-user-id">baseURL: {baseUrl}</Text>
      <Pressable
        onPress={() => {
          handleBaseUrlUpdate(baseUrl);
        }}>
        <Text>Connect to Edge Server</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          handleBaseUrlUpdate('');
        }}>
        <Text>Connect to Atlas directly</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
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
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export {ChangeBaseUrl, SetCustomBaseUrl};
