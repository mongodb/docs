final yoda = realm.write<Person>(() {
  return realm.add(Person(ObjectId(), 'Yoda'));
});
