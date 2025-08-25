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
        onChangeText={text => setInventoryItem(text)}
        value={inventoryItem}
      />
      <Button
        title='Remove Inventory Item'
        onPress={removeInventoryItem}
      />
      <Button
        title='Remove All Inventory'
        onPress={removeAllInventory}
      />
    </View>
  );
};
