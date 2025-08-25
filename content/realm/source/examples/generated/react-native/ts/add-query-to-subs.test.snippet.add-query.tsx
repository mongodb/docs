import React, {useEffect} from 'react';
import {Text, FlatList} from 'react-native';
import {useRealm, useQuery} from '@realm/react';

function SubscriptionManager() {
  const realm = useRealm();
  const seenBirds = useQuery(Bird, birds => {
    return birds.filtered('haveSeen == true');
  });

  useEffect(() => {
    realm.subscriptions.update(
      (mutableSubs: Realm.App.Sync.MutableSubscriptionSet) => {

        // Create subscription for filtered collection.
        mutableSubs.add(seenBirds, {name: 'seenBirds'});
      },
    );
  });

  return (
    <FlatList
      data={seenBirds}
      keyExtractor={item => item._id.toString()}
      renderItem={({item}) => <Text>{item._id.toString()}</Text>}
    />
  );
}
