// :snippet-start: subscribe-query
import React, {useEffect, useState} from 'react';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, FlatList} from 'react-native';

import {Bird} from '../../models';
import {Subscription} from 'realm/dist/bundle';

export const BasicSubscription = () => {
  const realm = useRealm();
  // Get all local birds that have not been seen yet.
  // :emphasize-start:
  const seenBirds = useQuery(Bird, collection =>
    collection.filtered('haveSeen == true'),
  );
  // :emphasize-end:
  const [seenBirdsSubscription, setSeenBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    // Create an async function so that we can `await` the
    // promise from `.subscribe()`.
    const createSubscription = async () => {
      // :emphasize-start:
      await seenBirds.subscribe({
        name: 'Birds I have seen',
      });
      // :emphasize-end:
    };

    createSubscription().catch(console.error);

    // Get the subscription...
    const subscription = realm.subscriptions.findByName('Birds I have seen');

    // ... and set it to a stateful variable or manage it in `useEffect`.
    setSeenBirdsSubscription(subscription);
  }, []);

  // :uncomment-start:
  // return (
  //   // Work with the subscribed results list or modify the subscription...
  //   <></>
  // );
  // :uncomment-end:
  // :remove-start:
  // This section of the component is only for testing - none of it
  // should be included in docs example code.
  return (
    <View>
      {seenBirdsSubscription?.name && (
        <Text testID="basic-subscription">
          Subscription name: {seenBirdsSubscription?.name}
        </Text>
      )}

      <Text>Seen birds:</Text>
      {seenBirds.length ? (
        <FlatList
          data={seenBirds}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => <Text>--- {item.name}</Text>}
        />
      ) : (
        <Text>No seen birds</Text>
      )}

      <Text>-------------------------------</Text>
    </View>
  );
  // :remove-end:
};
// :snippet-end:
