// Find the contact with the address you want to update
const harryPotter = realm
  .objects("Contact")
  .filtered("name = 'Harry Potter'")[0];
// modify the property of the embedded object in a write transaction
realm.write(() => {
  // update the embedded object directly through the contact
  harryPotter.address.street = "1 Hogwarts Ave";
});
