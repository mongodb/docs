final config = Configuration.local([Person.schema, Team.schema]);
final realm = Realm(config);
final heroes = Team(ObjectId(), 'Millenium Falcon Crew', crew: [
  Person(ObjectId(), 'Luke'),
  Person(ObjectId(), 'Leia'),
  Person(ObjectId(), 'Han'),
  Person(ObjectId(), 'Chewbacca')
]);
realm.write(() => realm.add(heroes));

final lukeAndLeia = heroes.crew.query('name BEGINSWITH \$0', ['L']);
