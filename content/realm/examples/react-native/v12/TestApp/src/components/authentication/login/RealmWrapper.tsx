// :snippet-start: configure-user-provider
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';

// Fallback log in component that's defined in another file.
import {LogIn} from './Login';
// :remove-start:
import {useState} from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {useUser, useAuth, useApp} from '@realm/react';
import {APP_ID} from '../../../../appServicesConfig';
import {Button} from '../../utility-components/Button';
import {LogInWithJWT} from './LoginWithJwt';
// :remove-end:

export const LoginExample = () => {
  return (
    <ScrollView>
      <AppProvider id={APP_ID}>
        {/* If there is no authenticated user, mount the
         `fallback` component. When user successfully
          authenticates, the app unmounts the `fallback`
          component (in this case, the `LogIn` component). */}
        <UserProvider fallback={LogIn}>
          {/* Components inside UserProvider have access
            to the user. These components only mount if
            there's an authenticated user. */}
          <UserInformation />
          {/* :remove-start: */}
          {/* JWT log in component needs to be here, as we
            need an anonymous user to call an app services
            function. */}
          <LogInWithJWT />
          <RefreshUserAcessToken />
          {/* :remove-end: */}
        </UserProvider>
      </AppProvider>
    </ScrollView>
  );
};
// :snippet-end:

// :snippet-start: log-user-out
function UserInformation() {
  const user = useUser();
  const {logOut} = useAuth();

  const performLogout = () => {
    logOut();
  };

  // Add UI for logging out...
  // :remove-start:
  const app = useApp();
  // Deletes the user, but @realm/react doesn't currently
  // rerender or fall back to the fallback component.
  const deleteUser = async () => {
    // Type hack because @realm/react's User type doesn't quite match
    // Realm's User type.
    app.deleteUser(user as unknown as Realm.User);
  };

  if (user) {
    return (
      <View>
        <Text>User state: {user.state}</Text>
        {user.profile.email && <Text>Email: {user.profile.email}</Text>}
        <FlatList
          testID="list-container"
          data={user.identities}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({item}) => (
            <UserIdentity
              id={item.id}
              providerType={item.providerType}
            />
          )}
        />

        <Button
          testID="log-out"
          title="Log out"
          onPress={performLogout}
        />
        <Button
          testID="delete-user"
          title="Delete user"
          onPress={deleteUser}
        />
      </View>
    );
  } else {
    return <Text>No user logged in</Text>;
  }
  // :remove-end:
}
// :snippet-end:

// :snippet-start: refresh-access-token
const RefreshUserAcessToken = () => {
  const user = useUser();
  const [accessToken, setAccessToken] = useState<string | null>();

  // Gets a valid user access token to authenticate requests
  const refreshAccessToken = async () => {
    // An already logged in user's access token might be stale. To
    // guarantee that the token is valid, refresh it if necessary.
    await user.refreshCustomData();

    setAccessToken(user.accessToken);
  };

  // Use access token...
  // :remove-start:
  return (
    <View>
      <Text testID="access-token">
        {accessToken ? accessToken : 'No access token found.'}
      </Text>
      <Button
        testID="refresh-token"
        title="Refresh token"
        onPress={refreshAccessToken}
      />
    </View>
  );
  // :remove-end:
};
// :snippet-end:

const UserIdentity = ({
  id,
  providerType,
}: {
  id: string;
  providerType: string;
}) => {
  return (
    <View
      testID="user-identity"
      style={styles.identity}>
      <Text testID="user-id">ID: {id}</Text>
      {providerType && (
        <Text testID="user-provider">Provider type: {providerType}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  identity: {
    marginVertical: 12,
    marginHorizontal: 8,
  },
});
