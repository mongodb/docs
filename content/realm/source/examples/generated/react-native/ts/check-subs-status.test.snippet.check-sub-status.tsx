import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
import {Bird} from '../Models/Bird';

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

  // Returns state of all subscriptions, not individual subscriptions.
  // In this case, it's just the subscription for `Bird` objects where
  // `haveSeen` is true.
  const allSubscriptionState = realm.subscriptions.state;

  return (
    <View>
      <Text >
        Status of all subscriptions: {allSubscriptionState}
      </Text>
    </View>
  );
}
