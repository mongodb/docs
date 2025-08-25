const HomeList = () => {
  // query for all HomeOwner objects
  const homeOwners = useQuery(HomeOwner);

  // run the `.filtered()` method on all the returned homeOwners to
  // find all homeOwners that have a house with a listed price
  const listedPriceHomes = useQuery(HomeOwner, homeOwners => {
    return homeOwners.filtered('home.@keys = "price"');
  });

  // run the `.filtered()` method on all the returned homeOwners to
  // find the house with the address "Summerhill St."
  const summerHillHouse = useQuery(HomeOwner, homeOwners => {
    return homeOwners.filtered('home["address"] = "Summerhill St."');
  })[0].home;

  // run the `.filtered()` method on all the returned homeOwners to
  // find the first house that has any field with a value of 'red'
  const redHouse = useQuery(HomeOwner, homeOwners => {
    return homeOwners.filtered('home.@values = "red"');
  })[0].home;

  return (
    <View>
      <Text>All homes:</Text>
      {homeOwners.map(homeOwner => (
        <View>
          <Text>{homeOwner.home.address}</Text>
        </View>
      ))}

      <Text>All homes with a price:</Text>
      {listedPriceHomes.map(homeOwner => (
        <View>
          <Text>{homeOwner.home.address}</Text>
          <Text>{homeOwner.home.price}</Text>
        </View>
      ))}

      <Text>Summer Hill House:</Text>
      <Text>{summerHillHouse.address}</Text>
      <Text>{summerHillHouse.color}</Text>

      <Text>Red House:</Text>
      <Text>{redHouse.address}</Text>
    </View>
  );
};
