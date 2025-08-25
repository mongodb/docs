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
        onChangeText={text => setInventoryItem(text)}
        value={inventoryItem}
      />
      <Button
        title='Add Inventory Item'
        onPress={addInventoryItem}
      />

      <Text>Ordered Inventory:</Text>
      {inventory.map(item => (
        <Text>{item}</Text>
      ))}

      <Text>Unordered Inventory:</Text>
      {character.inventory.map(item => (
        <Text>{item}</Text>
      ))}
    </View>
  );
};
