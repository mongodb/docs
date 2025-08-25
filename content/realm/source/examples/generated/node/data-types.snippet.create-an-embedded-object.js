//   create an embedded address object
const sydneyOrthodontics = {
  street: "42 Wallaby Way",
  city: "Sydney",
  country: "Australia",
  postalCode: "2774",
};
realm.write(() => {
  // create a contact object
  realm.create("Contact", {
    _id: new BSON.ObjectId(),
    name: "Philip Sherman",
    address: sydneyOrthodontics, // embed the address in the contact object
  });
});
