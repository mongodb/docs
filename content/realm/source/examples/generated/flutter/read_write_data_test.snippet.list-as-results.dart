final config = Configuration.local([Person.schema, Team.schema]);
final realm = Realm(config);
final heroes = Team(ObjectId(), 'Millenium Falcon Crew', crew: [
  Person(ObjectId(), 'Luke', hobbies: [
    'Going to Tashi Station',
    'Fixing the Moisture Vaporators'
  ]),
  Person(ObjectId(), 'Leia', hobbies: [
    'Going on diplomatic missions',
    'Rescuing short stormtroopers'
  ]),
  Person(ObjectId(), 'Han',
      hobbies: ['Shooting first', 'Making fast Kessel Runs']),
  Person(ObjectId(), 'Chewbacca', hobbies: [
    'Fixing the Millenium Falcon',
    'Tearing the arms off of droids'
  ])
]);
realm.write(() => realm.add(heroes));

// Converts the Team object's 'crew' List into a RealmResults<Person>.
final heroesCrewAsResults = heroes.crew.asResults();

final luke = heroesCrewAsResults.query("name == 'Luke'").first;
// Converts Luke's 'hobbies' list into a RealmResults<String>
final lukeHobbiesAsResults = luke.hobbies.asResults();
