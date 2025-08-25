realm.write(() => {
  // Add a new person to the realm. Since nobody with ID 1234
  // has been added yet, this adds the instance to the realm.
  person = realm.create(
    "Person",
    { _id: 1234, name: "Joe", age: 40 },
    "modified"
  );

  // If an object exists, setting the third parameter (`updateMode`) to
  // "modified" only updates properties that have changed, resulting in
  // faster operations.
  person = realm.create(
    "Person",
    { _id: 1234, name: "Joseph", age: 40 },
    "modified"
  );
});
