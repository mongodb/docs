import {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

import {Create} from '../Create';
import {Read} from '../Read';
import {Update} from '../Update';
import {Delete} from '../Delete';
import {APP_ID} from '../../../../appServicesConfig';

// :snippet-start: qs-realm-sync
import React from 'react';
import {Credentials} from 'realm';
import {RealmProvider, AppProvider, UserProvider, useApp} from '@realm/react';
// Import your models
import {Profile} from '../../../models';

// Expose a sync realm
export function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          path="quickstartsync.realm" // :remove:
          schema={[Profile]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              console.log(error);
            },
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Profile'));
              },
              rerunOnOpen: true,
            },
          }}
          fallback={fallback}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

function fallback() {
  return <Text>Not happy!</Text>;
}

function LogIn() {
  const app = useApp();
  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <Text>Just for testing</Text>;
}

const RestOfApp = () => {
  return (
    <ScrollView>
      <View style={styles.separator}>
        <Read />
      </View>
      <View style={styles.separator}>
        <Create />
      </View>
      <View style={styles.separator}>
        <Update />
      </View>
      <View style={styles.separator}>
        <Delete />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
