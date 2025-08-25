const AddInventoryToCharacter = ({
  characterName,
}: {
  characterName: string;
}) => {
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
        onChangeText={text => setInventoryItem(text)}
        value={inventoryItem}
      />
      <Button
        title='Add Inventory Item'
        onPress={addInventoryItem}
      />
    </View>
  );
};
