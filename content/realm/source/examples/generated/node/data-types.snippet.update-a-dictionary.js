realm.write(() => {
  // use the `set()` method to update a field of a dictionary
  summerHillHouse.set({ price: 400100 });
  // alternatively, update a field of a dictionary through dot notation
  summerHillHouse.color = "brown";
  // update a dictionary by adding a field
  summerHillHouse.yearBuilt = 2004;
});
