import React, {useEffect} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {RealmProvider, useQuery, useRealm} from '@realm/react';
import {View, Text, FlatList} from 'react-native';

// :snippet-start: model-optional-properties
class Person extends Realm.Object<Person> {
  name!: string;
  age?: number;
  birthday?: Date;

  static schema: ObjectSchema = {
    name: 'Person',
    properties: {
      name: 'string',
      age: {
        type: 'int',
        optional: true, // :emphasize:
      },
      // You can use a simplified syntax instead. For
      // more complicated types, use the object syntax.
      birthday: 'date?', // :emphasize:
    },
  };
}
// :snippet-end:

export const ObjectModels = () => {
  return (
    <>
      <RealmProvider schema={[Person]}>
        <ObjectModelList />
      </RealmProvider>
    </>
  );
};

export const ObjectModelList = () => {
  const realm = useRealm();
  const people = useQuery(Person);

  // If no Person objects in realm, create
  // two for testing.
  useEffect(() => {
    if (!people.length) {
      realm.write(() => {
        // This one doesn't have a birthday.
        realm.create(Person, {
          name: 'AgeBot',
          age: 2,
        });

        // This one doesn't have an age.
        realm.create(Person, {
          name: 'BirthdayBot',
          birthday: new Date(2023, 8, 1),
        });
      });
    }
  }, []);

  if (people.length) {
    return (
      <FlatList
        data={people}
        keyExtractor={item => item.name}
        renderItem={PersonItem}
      />
    );
  } else {
    return <Text>No schemas found for this realm.</Text>;
  }
};

export const PersonItem = ({item}: {item: Person}) => {
  return (
    <View testID={item.name}>
      <Text>{item.name}</Text>
      <Text>{item.age}</Text>
      <Text>{item.birthday?.toString()}</Text>
    </View>
  );
};
