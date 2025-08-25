// :snippet-start: wait-firsttime
import React, {useEffect, useState} from 'react';
import {BSON, WaitForSync} from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

import {Bird} from '../../models';
import {Subscription} from 'realm/dist/bundle';

export const WaitFirstTime = () => {
  const realm = useRealm();
  const [birdName, setBirdName] = useState('Change me!');

  // Get local birds that have been marked as "haveSeen".
  // :emphasize-start:
  const seenBirds = useQuery(Bird, collection =>
    collection.filtered('haveSeen == true'),
  );
  // :emphasize-end:
  const [seenBirdsSubscription, setSeenBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    const createSubscription = async () => {
      // Only wait for sync to finish on the initial sync.
      await seenBirds.subscribe({
        behavior: WaitForSync.FirstTime, // :emphasize:
        name: 'First time sync only',
      });
    };

    createSubscription().catch(console.error);

    // Get the subscription...
    const subscription = realm.subscriptions.findByName('First time sync only');

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
  const writeRealmObject = async (name: string) => {
    realm.write(() => {
      realm.create(Bird, {
        _id: new BSON.ObjectId(),
        name: name,
        haveSeen: true,
      });
    });
  };

  const clearRealm = async () => {
    realm.write(() => {
      realm.deleteAll();
    });

    await realm.syncSession?.uploadAllLocalChanges();
  };

  return (
    <View>
      {seenBirdsSubscription?.name && (
        <Text testID="seenbird-subscription">
          Subscription name: {seenBirdsSubscription?.name}
        </Text>
      )}

      <TextInput
        onChangeText={setBirdName}
        value={birdName}
      />

      <Button
        testID="add-bird"
        title="Add Seen Bird"
        onPress={() => {
          writeRealmObject(birdName);
        }}
      />
      <Button
        title="Remove all birds"
        onPress={() => {
          clearRealm();
        }}
      />

      <Text>Seen birds:</Text>
      {seenBirds.length ? (
        <FlatList
          data={seenBirds}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => <Text>--- {item.name}</Text>}
        />
      ) : (
        <Text>No birds seen</Text>
      )}
    </View>
  );
  // :remove-end:
};
// :snippet-end:
