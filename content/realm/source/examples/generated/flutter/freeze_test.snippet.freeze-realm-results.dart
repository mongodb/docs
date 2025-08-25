// Add data to the realm
final maceWindu = Person(ObjectId(), "Mace", "Windu");
final jocastaNu = Person(ObjectId(), "Jocasta", "Nu");
realm.write(() => realm.addAll([maceWindu, jocastaNu]));

// Get RealmResults and freeze data
final people = realm.all<Person>();
final frozenPeople = people.freeze();

// Update data in the non-frozen realm
final newLastName = "Foo";
realm.write(() {
  for (var person in people) {
    person.lastName = newLastName;
  }
});

// Data changes not in the frozen snapshot
final frozenFooPeople =
    frozenPeople.query("lastName == \$0", [newLastName]);
print(frozenFooPeople.length); // prints 0

// You must also close the frozen realm associated
// with the frozen RealmResults before exiting the process
frozenPeople.realm.close();
