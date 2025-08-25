let johnDoe;
let janeSmith;
realm.write(() => {
  johnDoe = realm.create("Person", {
    name: "John Doe",
    home: {
      windows: 5,
      doors: 3,
      color: "red",
      address: "Summerhill St.",
      price: 400123,
    },
  });
  janeSmith = realm.create("Person", {
    name: "Jane Smith",
    home: {
      address: "100 northroad st.",
      yearBuilt: 1990,
    },
  });
});
