import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {useAuth} from '@realm/react';
// :remove-start:
import {StyleSheet} from 'react-native';
import {AuthError} from '@realm/react';
import {LoginWithEmail} from './LoginWithEmail';
import {LogInWithAnonymous} from './LoginWithAnonymous';
import {LogInWithFunction} from './LoginWithFunction';
// :remove-end:

// :snippet-start: user-provider-fallback
// :replace-start: {
//    "terms": {
//       "style={styles.container}": ""
//    }
// }
export const LogIn = () => {
  // `logInWithAnonymous` logs in a user using an
  // anonymous Realm Credential.
  // `result` gives us access to the result of the
  // current operation. In this case, `logInWithAnonymous`.
  const {logInWithAnonymous, result} = useAuth();

  // :uncomment-start:
  // // Log in an anyonmous user on component render.
  // // On successful login, this fallback component unmounts.
  // useEffect(() => {
  //   logInWithAnonymous();
  // }, [])
  // :uncomment-end:

  return (
    <View style={styles.container}>
      {!result.error && <Text>Please log in</Text>}
      <View>
        {result.pending && <ActivityIndicator />}
        {result.error && <ErrorComponent error={result.error} />}
      </View>
      {/* :remove-start: */}
      <View>
        <View style={styles.buttonGroup}>
          <LogInWithAnonymous />
          {/* The following login options will be added
              In future PRs. */}
          {/* <LoginWithApiKey /> */}
          {/* <LoginOffline /> */}
          {/* <LoginWithGoogle /> */}
          {/* <LoginWithFacebook /> */}
          {/* <LoginWithApple /> */}
        </View>
      </View>

      <LoginWithEmail />

      <LogInWithFunction />
      {/* :remove-end: */}
    </View>
  );
};
// :replace-end:
// :snippet-end:

function ErrorComponent({error}: {error: AuthError}) {
  return (
    <View>
      <Text>{error.name}</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
});
