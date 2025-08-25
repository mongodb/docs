// query for all Person objects
const persons = realm.objects("Person");

// run the `.filtered()` method on all the returned persons to
// find the house with the address "Summerhill St."
const summerHillHouse = persons.filtered(
  `home['address'] = "Summerhill St."`
)[0].home;

// Find all people that have a house with a listed price
const peopleWithHousesWithAListedPrice = persons.filtered(
  `home.@keys = "price" `
);
// find a house that has any field with a value of 'red'
const redHouse = persons.filtered(`home.@values = "red" `)[0].home;
