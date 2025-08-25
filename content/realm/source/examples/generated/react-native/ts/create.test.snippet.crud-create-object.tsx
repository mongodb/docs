import React, {useState} from 'react';
import {Button, TextInput} from 'react-native';
import {RealmProvider, useRealm} from '@realm/react';

class Dog extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age!: number;

  static schema: ObjectSchema = {
    name: 'Dog',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int?',
    },
  };
}

const App = () => (
  <RealmProvider schema={[Dog]}>
    <CreateDogInput />
  </RealmProvider>
);

const CreateDogInput = () => {
  const [dogName, setDogName] = useState('Fido');
  const realm = useRealm();

  const handleAddDog = () => {
    realm.write(() => {
      realm.create('Dog', {
        _id: newObjectId,
        name: dogName,
        age: 1,
      });
    });
  };

  return (
    <>
      <TextInput onChangeText={setDogName} value={dogName} />
      <Button
        onPress={() => handleAddDog()}
        title='Add Dog'
      />
    </>
  );
};
