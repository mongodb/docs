const CreateCatsInput = () => {
  const realm = useRealm();

  useEffect(() => {
    // Add data to the Realm when the component mounts
    realm.write(() => {
      // create a Cat with a birthDate value of type string
      realm.create('Cat', {
        name: 'Euler',
        birthDate: 'December 25th, 2017',
      });

      // create a Cat with a birthDate value of type date
      realm.create('Cat', {
        name: 'Blaise',
        birthDate: new Date('August 17, 2020'),
      });

      // create a Cat with a birthDate value of type int
      realm.create('Cat', {name: 'Euclid', birthDate: 10152021});

      // create a Cat with a birthDate value of type null
      realm.create('Cat', {name: 'Pythagoras', birthDate: null});
    });
  }, []);

  // retrieve all cats
  const cats = useQuery(Cat);

  return (
    <>
      {cats.map(cat => (
        <View>
          <Text>{cat.name}</Text>
          <Text>{String(cat.birthDate)}</Text>
        </View>
      ))}
    </>
  );
};
