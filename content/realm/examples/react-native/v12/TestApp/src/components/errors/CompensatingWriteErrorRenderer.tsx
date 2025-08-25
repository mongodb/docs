import React from 'react';
import {BSON, CompensatingWriteError} from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, Button, FlatList} from 'react-native';

import {Person, Turtle} from '../../models';

type errorsProps = {
  error: CompensatingWriteError | undefined;
};

export const CompensatingWriteErrorHandler = ({error}: errorsProps) => {
  // const [peopleSub, setPeopleSub] = useState<Subscription | null>(null);

  const realm = useRealm();
  const people = useQuery(Person, collection =>
    collection.filtered('name == "Luigi"'),
  );
  const turtles = useQuery(Turtle, collection =>
    collection.filtered('age > 5'),
  );

  const writeWithinSubscriptions = () => {
    realm.write(() => {
      const luigi = realm.create(Person, {
        _id: new BSON.ObjectId(),
        name: 'Luigi',
        age: 20,
      });

      realm.create(Turtle, {
        _id: new BSON.ObjectId(),
        name: 'Koopa',
        owner: luigi,
        age: 6,
      });
    });
  };

  const writeOutsideSubscriptions = () => {
    realm.write(() => {
      const tom = realm.create(Person, {
        _id: new BSON.ObjectId(),
        name: 'Daisy',
        age: 36,
      });
      realm.create(Turtle, {
        _id: new BSON.ObjectId(),
        name: 'Phillip',
        owner: tom,
        age: 1,
      });
    });
  };

  const removeAllObjects = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  return (
    <View>
      {/* <Text testID="subscription-name">{peopleSub?.name}</Text> */}
      <Button
        testID="write-within-subscriptions"
        title="Write within subscriptions"
        onPress={() => {
          writeWithinSubscriptions();
        }}
      />
      <Button
        testID="write-outside-subscriptions"
        title="Write outside subscriptions"
        onPress={() => {
          writeOutsideSubscriptions();
        }}
      />
      <Button
        testID="remove-all-objects"
        title="Remove all objects"
        onPress={() => {
          removeAllObjects();
        }}
      />
      <View>
        <Text>Objects within subscriptions:</Text>
        <FlatList
          testID="people-list-container"
          data={people}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <Text testID="person">
              --- {item.name} | {item.age}
            </Text>
          )}
        />
        <FlatList
          testID="turtle-list-container"
          data={turtles}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <Text testID="turtle">
              --- {item.name} | {item.age}
            </Text>
          )}
        />
      </View>
      <View>
        <Text>Errors:</Text>
        <Text testID="error-info">
          {error?.category} | {error?.name}{' '}
        </Text>
        <Text>{error?.message}</Text>
        {error && (
          <FlatList
            testID="error-list-container"
            data={error.writes}
            renderItem={({item}) => (
              <Text testID="compensating-write-error">
                --- {item.objectName} | {item.reason}
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
};
