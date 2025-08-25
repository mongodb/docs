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
      <Text>
        Total number of inventory items: {character.inventory.size}
      </Text>
      <TextInput
        onChangeText={text => setInventoryItem(text)}
        value={inventoryItem}
      />
      <Button
        title='Query for Inventory'
        onPress={queryCharacterInventory}
      />
    </View>
  );
};
