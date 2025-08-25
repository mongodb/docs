import React from 'react';
import {Button, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Dog from '../Models/Dog';
import Person from '../Models/Person';

const realmConfig = {
  schema: [Dog, Person],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

let assertionRealm: Realm;

describe('Delete Data Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects('Dog'));

      assertionRealm.create('Dog', {name: 'Blaise', age: 7});
      assertionRealm.create('Dog', {name: 'Bronson', age: 2});
      assertionRealm.create('Dog', {name: 'Bowie', age: 1});

      assertionRealm.create('Person', {name: 'John Smith', age: 18});
      assertionRealm.create('Person', {name: 'Jane Doe', age: 20});
    });
  });

  it('should delete an object', async () => {
    // :snippet-start: crud-delete-object
    const DogList = () => {
      const realm = useRealm();
      const myDogs = useQuery(Dog);

      const deleteDog = (deletableDog: Dog) => {
        realm.write(() => {
          realm.delete(deletableDog);
        });
      };

      return (
        <>
          {myDogs.map(dog => {
            return (
              <>
                <Text>{dog.name}</Text>
                <Button
                  onPress={() => deleteDog(dog)}
                  title='Delete Dog'
                  testID='deleteDog' // :remove:
                />
              </>
            );
          })}
        </>
      );
    };
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <DogList />
      </RealmProvider>
    );
    const {getAllByTestId} = render(<App />);

    const deleteDogButtons = await waitFor(() => getAllByTestId('deleteDog'), {
      timeout: 5000,
    });
    const firstDeleteDogButton = deleteDogButtons[0];

    // Test that a Dog Realm.Object is deleted and there is one less Dog in the UI when the "Delete Dog" button is pressed
    expect(assertionRealm.objects('Dog').length).toBe(3);
    expect(getAllByTestId('deleteDog').length).toBe(3); // we can't use the value of deleteDogButtons because the variable doesn't update when a deleteDog testID is removed from the UI, so we need to call getAllByTestId() again

    fireEvent.press(firstDeleteDogButton);

    await waitFor(() => {
      expect(getAllByTestId('deleteDog').length).toBe(2);
    });

    expect(assertionRealm.objects('Dog').length).toBe(2);
    expect(getAllByTestId('deleteDog').length).toBe(2);
  });

  it('should delete multiple objects', async () => {
    // :snippet-start: crud-delete-multiple-objects
    // :replace-start: {
    //  "terms": {
    //   " testID='dogItem'": ""
    //   }
    // }
    const DogList = () => {
      const realm = useRealm();
      const myDogs = useQuery(Dog);

      const deleteAllYoungDogObjects = () => {
        const youngDogs = useQuery(Dog, dogs => {
          return dogs.filtered('age < 3');
        });
        realm.write(() => {
          realm.delete(youngDogs);
        });
      };
      const deleteAllDogObjects = () => {
        realm.write(() => {
          realm.delete(myDogs);
        });
      };

      return (
        <>
          {myDogs.map(dog => {
            return (
              <>
                <Text testID='dogItem'>{dog.name}</Text>
                <Text>{dog.age}</Text>
              </>
            );
          })}
          <Button
            onPress={() => deleteAllYoungDogObjects()}
            title='Delete Young Dog Objects'
            testID='deleteYoungDogs' // :remove:
          />
          <Button
            onPress={() => deleteAllDogObjects()}
            title='Delete All Dog Objects'
            testID='deleteAllDogs' // :remove:
          />
        </>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <DogList />
      </RealmProvider>
    );
    const {getByTestId, getAllByTestId} = render(<App />);

    await waitFor(() => getAllByTestId('dogItem'), {timeout: 5000}); // even though we don't use this as variable, react-native-testing-library requires us to waitFor() this to avoid the following error: "Unable to find an element with testID: dogItem"

    // Test that the young Dog objects (Bronson, Bowie) have been deleted from the realm + from the UI when the "Delete All Dog Objects" is pressed, leaving 1 dog object (Blaise) remaining
    const deleteYoungDogsBtn = await waitFor(
      () => getByTestId('deleteYoungDogs'),
      {timeout: 5000},
    );

    await act(async () => {
      fireEvent.press(deleteYoungDogsBtn);
    });

    expect(assertionRealm.objects('Dog').length).toBe(1);
    expect(getAllByTestId('dogItem').length).toBe(1);

    // Test that all Dog objects have been deleted when the "Delete Young Dog Objects" is pressed, leaving 0 dog objects remaining
    const deleteAllDogs = await waitFor(() => getByTestId('deleteAllDogs'), {
      timeout: 5000,
    });

    await act(async () => {
      fireEvent.press(deleteAllDogs);
    });

    expect(assertionRealm.objects('Dog').length).toBe(0);
  });

  it('should delete all objects', async () => {
    // :snippet-start: crud-delete-all-objects
    const DeleteProfileSettingsScreen = () => {
      const realm = useRealm();

      const deleteAllData = () => {
        realm.write(() => {
          realm.deleteAll();
        });
      };

      return (
        <>
          <Text>Delete all data in your profile:</Text>
          <Button
            onPress={deleteAllData}
            title='Delete all data'
            testID='deleteAllData' // :remove:
          />
        </>
      );
    };
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <DeleteProfileSettingsScreen />{' '}
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const deleteAllDataBtn = await waitFor(() => getByTestId('deleteAllData'), {
      timeout: 5000,
    });

    // Test that when the "Delete all Button" is called, there are no Person or Dog objects.
    await act(async () => {
      fireEvent.press(deleteAllDataBtn);
    });

    expect(assertionRealm.objects('Dog').length).toBe(0);
    expect(assertionRealm.objects('Person').length).toBe(0);
  });
});
