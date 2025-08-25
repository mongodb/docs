const DogList = () => {
  const realm = useRealm();
  const myDogs = useQuery(Dog);

  const deleteDog = (deletableDog: Dog) => {
    realm.write(() => {
      realm.delete(deletableDog);
    });
  };

  return (
    <>
      {myDogs.map(dog => {
        return (
          <>
            <Text>{dog.name}</Text>
            <Button
              onPress={() => deleteDog(dog)}
              title='Delete Dog'
            />
          </>
        );
      })}
    </>
  );
};
