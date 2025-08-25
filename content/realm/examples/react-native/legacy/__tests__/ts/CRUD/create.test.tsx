// :snippet-start: crud-create-object
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native';
import {RealmProvider, useRealm} from '@realm/react';
// :remove-start:
import Realm, {ObjectSchema} from 'realm';
import {render, fireEvent, act} from '@testing-library/react-native';
import {useQuery} from '@realm/react';

let higherScopeDogs: Realm.Results<Dog>;
let newObjectId = new Realm.BSON.ObjectID();
// :remove-end:

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
  const dogs = useQuery(Dog); // :remove:

  const handleAddDog = () => {
    realm.write(() => {
      realm.create('Dog', {
        _id: newObjectId,
        name: dogName,
        age: 1,
      });
    });
    higherScopeDogs = dogs; // :remove:
  };

  return (
    <>
      <TextInput onChangeText={setDogName} value={dogName} />
      <Button
        onPress={() => handleAddDog()}
        title='Add Dog'
        testID='handleAddDogBtn' // :remove:
      />
    </>
  );
};
// :snippet-end:

describe('Create Data Tests', () => {
  beforeEach(() => {
    Realm.clearTestState();
  });

  test('Create a new object', async () => {
    const {findByTestId} = render(<App />);

    // get the Add Dog button
    const handleAddDogBtn = await findByTestId('handleAddDogBtn');

    // press the Add Dog button
    await act(() => {
      fireEvent.press(handleAddDogBtn);
    });

    // check if the new Dog object has been created
    const myDog = higherScopeDogs.filtered('_id == $0', newObjectId)[0];
    expect(myDog._id).toEqual(newObjectId);
  });
});
