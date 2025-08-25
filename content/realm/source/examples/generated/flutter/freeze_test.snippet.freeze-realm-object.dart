final person = realm.query<Person>(
    'firstName == \$0 AND lastName == \$1', ["Count", "Dooku"]).first;

// Freeze RealmObject
final frozenPerson = person.freeze();

// Change data in the unfrozen object.
realm.write(() {
  realm.delete(person);
});

// Frozen person snapshot still exists even though data deleted
// in the unfrozen realm
print(frozenPerson.isValid); // prints true
print(person.isValid); // prints false

// You must also close the frozen realm associated
// with the frozen RealmObject before exiting the process
frozenPerson.realm.close();
