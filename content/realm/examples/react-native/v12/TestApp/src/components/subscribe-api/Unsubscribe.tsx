// :snippet-start: unsubscribe-query
import React, {useEffect, useState} from 'react';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, Button} from 'react-native';

import {Bird} from '../../models';
import {Subscription} from 'realm/dist/bundle';

export const Unsubscribe = () => {
  const realm = useRealm();
  const birds = useQuery(Bird); // :emphasize:
  // :remove-start:
  const [birdsSubscription, setBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    const getSubscription = async () => {
      // Get an initial subscription named "Initial birds".
      const subscription = realm.subscriptions.findByName('Initial birds');

      // Set subscription to stateful variable or manage
      // it in `useEffect`.
      setBirdsSubscription(subscription);
    };

    getSubscription().catch(console.error);
  }, []);
  // :remove-end:

  const unsubscribeFromQuery = () => {
    birds.unsubscribe(); // :emphasize:
    setBirdsSubscription(realm.subscriptions.findByName('Initial birds')); // :remove:
  };

  return (
    <View>
      {/* :remove-start: */}
      <Text testID="bird-subscription">
        Subscription name: {birdsSubscription?.name}
      </Text>
      {/* :remove-end: */}
      <Button
        testID="unsubscribe" // :remove:
        title="Unsubscribe"
        // :emphasize-start:
        onPress={() => {
          unsubscribeFromQuery();
        }}
        // :emphasize-end:
      />
    </View>
  );
};
// :snippet-end:
