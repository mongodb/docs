// Add Leia to the realm using `writeAsync`
Person leia = Person(ObjectId(), "Leia");
realm.writeAsync(() {
  realm.add<Person>(leia);
});
