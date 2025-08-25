import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
// get realm context from createRealmContext()
import {RealmContext} from '../RealmConfig';
import {Text, FlatList} from 'react-native';

const {RealmProvider, useQuery} = RealmContext;

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Turtle'));
              },
            },
            onError: console.log,
          }}>
          <SubscriptionManager />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

function SubscriptionManager() {

  // Pass object model to useQuery to get all objects of type `Turtle`.
  // These results automatically update with changes from other devices
  // because we created a subscription with `initialSubscriptions`.
  const allTurtles = useQuery('Turtle');

  return (
    <FlatList
      data={allTurtles}
      keyExtractor={turtle => turtle._id.toString()}
      renderItem={({item}) => <Text>{item._id}</Text>}
    />
  );
}
