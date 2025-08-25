const CreatePersonInput = () => {
  const [name, setName] = useState('');
  const realm = useRealm();

  const handleAddPerson = () => {
    realm.write(() => {
      realm.create('Person', {_id: PERSON_ID, name: name, age: 25});
    });
  };

  return (
    <>
      <TextInput value={name} onChangeText={setName}  />
      <Button
        onPress={() => handleAddPerson()}
        title='Add Person'
      />
    </>
  );
};
