const OverwriteContact = ({contactId}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const contact = useObject(Contact, contactId);
  const realm = useRealm();

  const updateAddress = () => {
    realm.write(() => {
      // Within a write transaction, overwrite the embedded object with the new address
      const address = {
        street,
        city,
        country,
        postalCode,
      };

      contact.address = address;
    });
  };
  return (
    <View>
      <Text>{contact.name}</Text>
      <Text>Enter the new address:</Text>
      <TextInput
        value={street}
        onChangeText={setStreet}
        placeholder='Street'
      />
      <TextInput value={city} onChangeText={setCity} placeholder='City' />
      <TextInput
        value={country}
        onChangeText={setCountry}
        placeholder='Country'
      />
      <TextInput
        value={postalCode}
        onChangeText={setPostalCode}
        placeholder='Postal Code'
      />
      <Button
        onPress={updateAddress}
        title='Overwrite Address'
      />
    </View>
  );
};
