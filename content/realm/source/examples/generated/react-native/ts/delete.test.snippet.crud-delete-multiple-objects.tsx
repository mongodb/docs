const DogList = () => {
  const realm = useRealm();
  const myDogs = useQuery(Dog);

  const deleteAllYoungDogObjects = () => {
    const youngDogs = useQuery(Dog, dogs => {
      return dogs.filtered('age < 3');
    });
    realm.write(() => {
      realm.delete(youngDogs);
    });
  };
  const deleteAllDogObjects = () => {
    realm.write(() => {
      realm.delete(myDogs);
    });
  };

  return (
    <>
      {myDogs.map(dog => {
        return (
          <>
            <Text>{dog.name}</Text>
            <Text>{dog.age}</Text>
          </>
        );
      })}
      <Button
        onPress={() => deleteAllYoungDogObjects()}
        title='Delete Young Dog Objects'
      />
      <Button
        onPress={() => deleteAllDogObjects()}
        title='Delete All Dog Objects'
      />
    </>
  );
};
