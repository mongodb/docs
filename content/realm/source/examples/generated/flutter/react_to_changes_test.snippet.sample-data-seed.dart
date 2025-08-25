final frodo = Character(ObjectId(), 'Frodo', 'Hobbit', 51);
final samwise = Character(ObjectId(), 'Samwise', 'Hobbit', 39);
final gollum = Character(ObjectId(), 'Gollum', 'Hobbit', 589);
final aragorn = Character(ObjectId(), 'Aragorn', 'Human', 87);
final legolas = Character(ObjectId(), 'Legolas', 'Elf', 2931);
final gimli = Character(ObjectId(), 'Gimli', 'Dwarf', 140);

final fellowshipOfTheRing = Fellowship(
    ObjectId(), 'Fellowship of the Ring',
    members: [frodo, samwise, aragorn, legolas, gimli]);

final config = Configuration.local([Fellowship.schema, Character.schema]);
final realm = Realm(config);

realm.write(() {
  realm.add(fellowshipOfTheRing);
  realm.add(gollum); // not in fellowship
});
