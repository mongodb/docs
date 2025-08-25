realm.write(() => {
  // remove the 'windows' and 'doors' field of the Summerhill House.
  summerHillHouse.remove(["windows", "doors"]);
});
