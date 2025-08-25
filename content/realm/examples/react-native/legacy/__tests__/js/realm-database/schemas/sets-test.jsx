import React, {useEffect, useState} from 'react';
import {Button, TextInput, View, Text, Alert} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Character from '../../Models/Character';

const realmConfig = {
  schema: [Character],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

let assertionRealm;

// test describe block for the RealmSet schema
describe('Set schema', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Character));

      assertionRealm.create('Character', {
        _id: new Realm.BSON.ObjectId(),
        name: 'PlayerZero',
        levelsCompleted: [1, 2, 3],
        inventory: ['sword', 'shield', 'potion'],
      });

      assertionRealm.create('Character', {
        _id: new Realm.BSON.ObjectID(),
        name: 'PlayerOne',
        inventory: [],
        levelsCompleted: [],
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create an object with a set', async () => {
    // :snippet-start: create-set-object
    // :replace-start: {
    //  "terms": {
    //   " testID='characterName'": ""
    //   }
    // }
    const CreateInitialCharacters = () => {
      const realm = useRealm();
      useEffect(() => {
        realm.write(() => {
          realm.create('Character', {
            _id: new Realm.BSON.ObjectId(),
            name: 'AdventurousPlayer',
            inventory: ['elixir', 'compass', 'glowing shield'],
            levelsCompleted: [4, 9],
          });
        });
        realm.write(() => {
          realm.create('Character', {
            _id: new Realm.BSON.ObjectId(),
            name: 'HealerPlayer',
            inventory: ['estus flask', 'gloves', 'rune'],
            levelsCompleted: [1, 2, 5, 24],
          });
        });
      }, []);
      const characters = useQuery(Character);

      return (
        <View>
          {characters.map(character => (
            <View key={character._id}>
              <Text testID='characterName'>{character.name}</Text>
            </View>
          ))}
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <CreateInitialCharacters />
      </RealmProvider>
    );
    const {getAllByTestId} = render(<App />);
    await waitFor(
      () => {
        expect(getAllByTestId('characterName')[2]).toHaveTextContent(
          'AdventurousPlayer',
        );
        expect(getAllByTestId('characterName')[3]).toHaveTextContent(
          'HealerPlayer',
        );
      },
      {timeout: 5000},
    );
  });
  it('should add items to a set', async () => {
    // :snippet-start: add-items-to-set
    const AddInventoryToCharacter = ({characterName}) => {
      const realm = useRealm();
      const [inventoryItem, setInventoryItem] = useState('');
      const character = useQuery(
        Character,
        characters => {
          return characters.filtered(`name = '${characterName}'`);
        },
        [characterName],
      )[0];

      const addInventoryItem = () => {
        realm.write(() => {
          character?.inventory.add(inventoryItem);
        });
      };

      return (
        <View>
          <TextInput
            testID='inventoryInput' // :remove:
            onChangeText={text => setInventoryItem(text)}
            value={inventoryItem}
          />
          <Button
            testID='addInventoryItemBtn' // :remove:
            title='Add Inventory Item'
            onPress={addInventoryItem}
          />
        </View>
      );
    };
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <AddInventoryToCharacter characterName='PlayerZero' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const addInventoryItemBtn = await waitFor(
      () => getByTestId('addInventoryItemBtn'),
      {
        timeout: 5000,
      },
    );
    await act(() => {
      fireEvent.changeText(inventoryInput, 'Cape');
    });
    await act(() => {
      fireEvent.press(addInventoryItemBtn);
    });
    // Test that the cape has been added to the character's inventory
    expect(
      assertionRealm.objects(Character)[0].inventory.has('Cape'),
    ).toBeTruthy();
  });
  it('should check if a set has specific items and check the size of the set', async () => {
    // :snippet-start: check-set-items-and-size
    // :replace-start: {
    //  "terms": {
    //   " testID='inventoryLength'": ""
    //   }
    // }
    const QueryCharacterInventory = ({characterName}) => {
      const [inventoryItem, setInventoryItem] = useState('');
      const character = useQuery(
        Character,
        characters => {
          return characters.filtered(`name = '${characterName}'`);
        },
        [characterName],
      )[0];

      const queryCharacterInventory = () => {
        const characterDoesHaveItem = character.inventory.has(inventoryItem);
        if (characterDoesHaveItem) {
          Alert.alert(`Character has item: ${inventoryItem}`);
        } else {
          Alert.alert(`Item not found in character's inventory`);
        }
      };
      return (
        <View>
          <Text>{character.name}</Text>
          <Text testID='inventoryLength'>
            Total number of inventory items: {character.inventory.size}
          </Text>
          <TextInput
            testID='inventoryInput' // :remove:
            onChangeText={text => setInventoryItem(text)}
            value={inventoryItem}
          />
          <Button
            testID='queryCharacterInventoryBtn' // :remove:
            title='Query for Inventory'
            onPress={queryCharacterInventory}
          />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <QueryCharacterInventory characterName='PlayerZero' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const inventoryLength = await waitFor(
      () => getByTestId('inventoryLength'),
      {
        timeout: 5000,
      },
    );
    // test that PlayerZero has an inventory of length 3
    expect(inventoryLength).toHaveTextContent(
      'Total number of inventory items: 3',
    );

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const queryCharacterInventoryBtn = await waitFor(
      () => getByTestId('queryCharacterInventoryBtn'),
      {
        timeout: 5000,
      },
    );
    // mock the alert function
    jest.spyOn(Alert, 'alert');

    // test that when a user inputs an item that is in the character's inventory, the alert is triggered
    await act(() => {
      fireEvent.changeText(inventoryInput, 'sword');
    });
    await act(() => {
      fireEvent.press(queryCharacterInventoryBtn);
    });

    expect(Alert.alert).toHaveBeenCalledWith('Character has item: sword');
  });
  it('should remove one item from a set and remove all items from the set', async () => {
    // :snippet-start: remove-items-from-set
    const RemoveInventoryFromCharacter = ({characterName}) => {
      const realm = useRealm();
      const [inventoryItem, setInventoryItem] = useState('');
      const character = useQuery(
        Character,
        characters => {
          return characters.filtered(`name = '${characterName}'`);
        },
        [characterName],
      )[0];

      const removeInventoryItem = () => {
        realm.write(() => {
          character?.inventory.delete(inventoryItem);
        });
      };
      const removeAllInventory = () => {
        realm.write(() => {
          character?.inventory.clear();
        });
      };
      return (
        <View>
          <Text>{character.name}</Text>
          <TextInput
            testID='inventoryInput' // :remove:
            onChangeText={text => setInventoryItem(text)}
            value={inventoryItem}
          />
          <Button
            testID='removeInventoryItemBtn' // :remove:
            title='Remove Inventory Item'
            onPress={removeInventoryItem}
          />
          <Button
            testID='removeAllInventoryBtn' // :remove:
            title='Remove All Inventory'
            onPress={removeAllInventory}
          />
        </View>
      );
    };
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <RemoveInventoryFromCharacter characterName='PlayerZero' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const removeInventoryItemBtn = await waitFor(
      () => getByTestId('removeInventoryItemBtn'),
      {
        timeout: 5000,
      },
    );
    const removeAllInventoryBtn = await waitFor(
      () => getByTestId('removeAllInventoryBtn'),
      {
        timeout: 5000,
      },
    );

    // Test that the sword has been removed from the character's inventory when the removeInventoryItemBtn is pressed
    await act(() => {
      fireEvent.changeText(inventoryInput, 'sword');
    });
    await act(() => {
      fireEvent.press(removeInventoryItemBtn);
    });
    expect(
      assertionRealm.objects(Character)[0].inventory.has('sword'),
    ).toBeFalsy();

    // Test that the character's inventory is empty when the removeAllInventoryBtn is pressed
    await act(() => {
      fireEvent.press(removeAllInventoryBtn);
    });
    expect(assertionRealm.objects(Character)[0].inventory.size).toEqual(0);
  });
  it('should traverse a set', async () => {
    // :snippet-start: traverse-a-set
    // :replace-start: {
    //  "terms": {
    //   " testID='inventoryItem'": "",
    //   " testID='unorderedInventoryItem'": ""
    //   }
    // }
    const TraverseCharacterInventory = ({characterName}) => {
      const realm = useRealm();
      const [inventoryItem, setInventoryItem] = useState('');
      const [inventory, setInventory] = useState([]);

      const character = useQuery(
        Character,
        characters => {
          return characters.filtered(`name = '${characterName}'`);
        },
        [characterName],
      )[0];

      const addInventoryItem = () => {
        realm.write(() => {
          character?.inventory.add(inventoryItem);
        });
        setInventory([...inventory, inventoryItem]);
      };

      return (
        <View>
          <Text>{character.name}</Text>
          <Text>Add an item to the inventory:</Text>
          <TextInput
            testID='inventoryInput' // :remove:
            onChangeText={text => setInventoryItem(text)}
            value={inventoryItem}
          />
          <Button
            testID='addInventoryItemBtn' // :remove:
            title='Add Inventory Item'
            onPress={addInventoryItem}
          />

          <Text>Ordered Inventory:</Text>
          {inventory.map(item => (
            <Text testID='inventoryItem'>{item}</Text>
          ))}

          <Text>Unordered Inventory:</Text>
          {character.inventory.map(item => (
            <Text testID='unorderedInventoryItem'>{item}</Text>
          ))}
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <TraverseCharacterInventory characterName='PlayerOne' />
      </RealmProvider>
    );
    const {getByTestId, getAllByTestId} = render(<App />);

    const inventoryInput = await waitFor(() => getByTestId('inventoryInput'), {
      timeout: 5000,
    });
    const addInventoryItemBtn = await waitFor(
      () => getByTestId('addInventoryItemBtn'),
      {
        timeout: 5000,
      },
    );

    await act(() => {
      fireEvent.changeText(inventoryInput, 'cape');
    });
    await act(() => {
      fireEvent.press(addInventoryItemBtn);
    });
    await act(() => {
      fireEvent.changeText(inventoryInput, 'bow');
    });
    await act(() => {
      fireEvent.press(addInventoryItemBtn);
    });
    await act(() => {
      fireEvent.changeText(inventoryInput, 'dagger');
    });
    await act(() => {
      fireEvent.press(addInventoryItemBtn);
    });
    // test that there are 3 inventory items rendered

    const inventoryItems = await waitFor(
      () => getAllByTestId('inventoryItem'),
      {
        timeout: 5000,
      },
    );
    // test that the newly added inventory items have been rendered to the ui
    expect(inventoryItems[0].props.children).toEqual('cape');
    expect(inventoryItems[1].props.children).toEqual('bow');
    expect(inventoryItems[2].props.children).toEqual('dagger');

    // test the unordered inventory items
    const unorderedInventoryItems = await waitFor(
      () => getAllByTestId('unorderedInventoryItem'),
      {
        timeout: 5000,
      },
    );
    // Since we can't be certain of the order of the unordered inventory items, we'll test that the items are present
    expect(unorderedInventoryItems.length).toEqual(3);
  });
});
