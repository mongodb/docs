const UpdateHome = ({homeOwnerName}) => {
  const [address, setAddress] = useState('');
  const realm = useRealm();
  const homeOwner = useQuery(
    HomeOwner,
    homeOwners => {
      return homeOwners.filtered(`name == '${homeOwnerName}'`);
    },
    [homeOwnerName],
  )[0];

  const updateAddress = () => {
    // Update the home object with the new address
    realm.write(() => {
      // use the `set()` method to update a field of a dictionary
      homeOwner.home.set({address});
      // alternatively, update a field of a dictionary through dot notation
      homeOwner.home.yearRenovated = 2004;
    });
  };

  return (
    <View>
      <Text>{homeOwner.name}</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder='Enter new address'
      />
      <Button
        onPress={updateAddress}
        title='Update Address'
       
      />
    </View>
  );
};
