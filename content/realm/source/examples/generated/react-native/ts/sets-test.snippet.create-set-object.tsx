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
          <Text>{character.name}</Text>
        </View>
      ))}
    </View>
  );
};
