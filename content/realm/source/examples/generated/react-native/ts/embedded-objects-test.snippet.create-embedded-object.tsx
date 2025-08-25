const CreateContact = () => {
  const [name, setContactName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const realm = useRealm();

  const submitContact = () => {
    // Create a Contact within a write transaction
    realm.write(() => {
      // Create an embedded Address object
      const address = {
        street,
        city,
        country,
        postalCode,
      };

      realm.create('Contact', {
        _id: new Realm.BSON.ObjectID(),
        name,
        // Embed the address in the Contact object
        address,
      });
    });
  };
  return (
    <View>
      <TextInput value={name} onChangeText={text => setContactName(text)} />
      <TextInput value={street} onChangeText={text => setStreet(text)} />
      <TextInput value={city} onChangeText={text => setCity(text)} />
      <TextInput value={country} onChangeText={text => setCountry(text)} />
      <TextInput
        value={postalCode}
        onChangeText={text => setPostalCode(text)}
      />
      <Button
        title='Submit Contact'
        onPress={submitContact}
      />
    </View>
  );
};
