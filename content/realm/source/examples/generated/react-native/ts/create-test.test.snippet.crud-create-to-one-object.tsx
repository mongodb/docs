const CreatePetOwnerInput = () => {
  const [ownerName, setOwnerName] = useState('');
  const realm = useRealm();
  const newPet = useObject(Pet, PET_ID);

  const handleAddPetOwner = () => {
    // Create a new Pet Owner object, pass new Pet object in pet field
    realm.write(() => {
      realm.create('PetOwner', {
        _id: PETOWNER_ID,
        name: ownerName,
        age: 25,
        pet: newPet,
      });
    });
  };

  return (
    <>
      <TextInput
        onChangeText={setOwnerName}
        value={ownerName}
        
      />
      <Button
        onPress={() => handleAddPetOwner()}
        title='Add New Pet Owner'
      />
    </>
  );
};
