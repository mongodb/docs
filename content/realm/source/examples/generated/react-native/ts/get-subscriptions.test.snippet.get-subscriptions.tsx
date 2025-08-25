import React, {useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
import {Bird} from '../Models/Bird';

function SubscriptionManager() {
  const realm = useRealm();

  // Pass object model to useQuery and filter results.
  // This does not create a subscription.
  const seenBirds = useQuery(Bird, birds => {
    return birds.filtered('haveSeen == true');
  });

  const [subscriptions, setSubcriptions] = useState<
    App.Sync.SubscriptionSet | undefined
  >();

  useEffect(() => {
    const createSubscription = async () => {
      // Create subscription for filtered results.
      await realm.subscriptions.update(mutableSubs => {
        mutableSubs.add(seenBirds, {name: 'seen birds'});
      });
    };

    createSubscription().catch(console.error);

    // Set to state variable.
    setSubcriptions(realm.subscriptions);
  }, []);

  return (
    <FlatList
      data={subscriptions}
      keyExtractor={subscription => subscription.id.toString()}
      renderItem={({item}) => <Text>{item.name}</Text>}
    />
  );
}
