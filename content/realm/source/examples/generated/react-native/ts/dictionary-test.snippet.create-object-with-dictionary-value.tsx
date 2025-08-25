const CreateHomeOwner = () => {
  const [homeOwnerName, setHomeOwnerName] = useState('John Smith');
  const [address, setAddress] = useState('1 Home Street');
  const realm = useRealm();

  const submitHomeOwner = () => {
    // Create a HomeOwner realm object within a Write Transaction
    realm.write(() => {
      realm.create('HomeOwner', {
        name: homeOwnerName,
        // For the dictionary field, 'home', set the value
        // to a regular JavaScript object
        home: {
          address,
        },
      });
    });
  };
  return (
    <View>
      <TextInput
        value={homeOwnerName}
        onChangeText={text => setHomeOwnerName(text)}
      />
      <TextInput value={address} onChangeText={text => setAddress(text)} />
      <Button
        title='Submit Home Owner'
        onPress={submitHomeOwner}
      />
    </View>
  );
};
