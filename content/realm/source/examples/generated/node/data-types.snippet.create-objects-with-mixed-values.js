realm.write(() => {
  // create a Dog with a birthDate value of type string
  realm.create("Dog", { name: "Euler", birthDate: "December 25th, 2017" });

  // create a Dog with a birthDate value of type date
  realm.create("Dog", {
    name: "Blaise",
    birthDate: new Date("August 17, 2020"),
  });
  // create a Dog with a birthDate value of type int
  realm.create("Dog", {
    name: "Euclid",
    birthDate: 10152021,
  });
  // create a Dog with a birthDate value of type null
  realm.create("Dog", {
    name: "Pythagoras",
    birthDate: null,
  });
});
