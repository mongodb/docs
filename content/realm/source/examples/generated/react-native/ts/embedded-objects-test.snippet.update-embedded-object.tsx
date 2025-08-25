// Find the contact you want to update
const UpdateContact = ({contactId}: {contactId: Realm.BSON.ObjectId}) => {
  const [street, setStreet] = useState('');
  const contact = useObject(Contact, contactId);
  const realm = useRealm();

  const updateStreet = () => {
    // Modify the property of the embedded Address object in a write transaction
    realm.write(() => {
      // Update the address directly through the contact
      contact!.address.street = street;
    });
  };

  return (
    <View>
      <Text>{contact!.name}</Text>
      <TextInput
        value={street}
        onChangeText={setStreet}
        placeholder='Enter New Street Address'
      />
      <Button
        onPress={updateStreet}
        title='Update Street Address'
      />
    </View>
  );
};
