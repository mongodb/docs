// create a new address
const harryNewAddress = {
  street: "12 Grimmauld Place",
  city: "London",
  country: "UK",
  postalCode: "E1 7AA",
};
realm.write(() => {
  // overwrite the embedded object with the new address within a write transaction
  harryPotter.address = harryNewAddress;
});
