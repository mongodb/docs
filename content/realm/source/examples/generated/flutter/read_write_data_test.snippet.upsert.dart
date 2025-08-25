final id = ObjectId();
// Add Anakin Skywalker to the realm with primary key `id`
final anakin = Person(
  id,
  "Anakin Skywalker",
);
realm.write(() {
  realm.add<Person>(anakin);
});

// Overwrite the 'Anakin' Person object
// with a new 'Darth Vader' object
final darthVader = Person(id, 'Darth Vader');
realm.write(() {
  realm.add<Person>(darthVader, update: true);
});
