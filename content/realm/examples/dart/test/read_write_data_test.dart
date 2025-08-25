// NOTE: most of the Read and Write Data page tests are currently in the quick_start_test.dart
// file, as the examples are the same.
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';

part 'read_write_data_test.realm.dart';

// :snippet-start: models
@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<String> hobbies;
}

@RealmModel()
class _Team {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Person> crew;
  late RealmValue eventLog;
}
// :snippet-end:

void main() {
  group('Query Data', () {
    setUp(() async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);

      realm.write(() => realm.deleteAll<Person>());
      await delay(300);

      realm.close();
      await delay(300);

      Realm.deleteRealm(realm.config.path);
      await delay(300);
    });

    test('Query Object by Primary Key', () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);

      final lukePrimaryKey = ObjectId();
      realm.write(() => realm.add(Person(lukePrimaryKey, "Luke")));

      // :snippet-start: query-object-by-pk
      final luke = realm.find<Person>(lukePrimaryKey);
      // :snippet-end:
      expect(luke, isNotNull);
      expect(luke!.name, 'Luke');
      await cleanUpRealm(realm);
    });
    test('Query All Objects', () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);

      final lukePrimaryKey = ObjectId();
      realm.write(() => realm.add(Person(lukePrimaryKey, "Luke")));

      // :snippet-start: query-all-objects
      final people = realm.all<Person>();
      // :snippet-end:
      expect(people.length, 1);
      await cleanUpRealm(realm);
    });
    test('Query List of Realm Objects', () async {
      // :snippet-start: query-realm-list
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
      // :snippet-end:
      expect(lukeAndLeia.length, 2);
      expect(lukeAndLeia.query("name == 'Luke'").length, 1);
      realm.write(() {
        realm.deleteMany(realm.all<Person>());
        realm.deleteMany(realm.all<Team>());
      });
      await cleanUpRealm(realm);
    });
    test('Lists asResults', () async {
      // :snippet-start: list-as-results
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
      // :snippet-end:
      expect(heroesCrewAsResults.length, equals(4));
      expect(lukeHobbiesAsResults.contains('Going to Tashi Station'), true);
      realm.write(() {
        realm.deleteMany(realm.all<Person>());
        realm.deleteMany(realm.all<Team>());
      });
      await cleanUpRealm(realm);
    });
  });
  group('Filter Data', () {
    test('Filter Results', () async {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      final heroes = Team(ObjectId(), 'Millennium Falcon Crew', crew: [
        Person(ObjectId(), 'Luke'),
        Person(ObjectId(), 'Leia'),
        Person(ObjectId(), 'Han'),
        Person(ObjectId(), 'Chewbacca')
      ]);
      realm.write(() => realm.add(heroes));
      // :snippet-start: filter
      final team =
          realm.query<Team>('name == \$0', ['Millennium Falcon Crew']).first;
      final humanCrewMembers = team.crew.query('name != \$0', ['Chewbacca']);
      // :snippet-end:
      expect(team.name, 'Millennium Falcon Crew');
      expect(humanCrewMembers.length, 3);

      // :snippet-start: filter-iterable
      final listOfNames = ['Luke', 'Leia'];
      final matchingRealmObjects =
          realm.query<Person>('name IN \$0', [listOfNames]);
      // :snippet-end:
      expect(matchingRealmObjects.length, 2);
      for (var person in matchingRealmObjects) {
        print(person.name);
      }
      await cleanUpRealm(realm);
    });
    test('Sort Results', () async {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      // :snippet-start: sort
      realm.write(() {
        realm.addAll([
          Person(ObjectId(), 'Luke'),
          Person(ObjectId(), 'Leia'),
          Person(ObjectId(), 'Han'),
          Person(ObjectId(), 'Chewbacca')
        ]);
      });

      final alphabetizedPeople =
          realm.query<Person>('TRUEPREDICATE SORT(name ASC)');
      for (var person in alphabetizedPeople) {
        print(person.name);
      }
      // prints 'Chewbacca', 'Han', 'Leia', 'Luke'
      // :snippet-end:
      expect(alphabetizedPeople.first.name, 'Chewbacca');
      expect(alphabetizedPeople.last.name, 'Luke');
      await cleanUpRealm(realm);
    });
    test('Filter Nested Collections', () async {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);

      // :snippet-start: filter-nested-collections
      realm.write(() {
        realm.addAll([
          (Team(ObjectId(), 'Janitorial Staff',
              eventLog: RealmValue.from({
                '1': {
                  'date': DateTime.utc(5622, 8, 18, 12, 30, 0),
                  'type': ['work_order', 'maintenance'],
                  'summary': 'leaking pipes in control room',
                  'priority': 'high',
                },
                '2': {
                  'date': DateTime.utc(5622, 9, 18, 12, 30, 0),
                  'type': ['maintenance'],
                  'summary': 'trash compactor jammed',
                  'priority': 'low',
                  'comment': 'this is the second time this week'
                }
              }))),
          (Team(ObjectId(), 'IT',
              eventLog: RealmValue.from({
                '1': {
                  'date': DateTime.utc(5622, 9, 20, 12, 30, 0),
                  'type': ['hardware', 'repair'],
                  'summary': 'lightsaber damage to server room',
                  'priority': 'high',
                }
              })))
        ]);

        final teams = realm.all<Team>();
        // Use bracket notation to query collection values at the specified path
        final teamsWithHighPriorityEvents =
            // Check any element at that path with [*]
            teams.query("eventLog[*].priority == 'high'");
        print(teamsWithHighPriorityEvents.length); // prints `2`

        final teamsWithMaintenanceEvents =
            // Check for the first element at that path with [FIRST]
            teams.query("eventLog[*].type[FIRST] == 'maintenance'");
        print(teamsWithMaintenanceEvents.length); // prints `1`

        final teamsWithMultipleEvents =
            // Check for collection at that path with matching elements
            // Note that the order must match unless you use ANY or ALL
            teams.query("eventLog[*].type[*] == {'maintenance', 'work_order'}");
        print(
            teamsWithMultipleEvents.length); // prints `0` because order matters

        final teamsWithEventsAsLists =
            // Check the collection type with @type
            teams.query("eventLog[*].type.@type == 'list'");
        print(teamsWithEventsAsLists.length); // prints `2`
        // :remove-start:
        expect(teamsWithHighPriorityEvents.length, 2);
        expect(teamsWithMaintenanceEvents.length, 1);
        expect(teamsWithMultipleEvents.length, 0);
        expect(teamsWithEventsAsLists.length, 2);
        // :remove-end:
      });
      // :snippet-end:
      await cleanUpRealm(realm);
    });
    test('Limit Results', () async {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      // :snippet-start: limit
      realm.write(() {
        realm.addAll([
          Person(ObjectId(), 'Luke'),
          Person(ObjectId(), 'Luke'),
          Person(ObjectId(), 'Luke'),
          Person(ObjectId(), 'Luke')
        ]);
      });

      final limitedPeopleResults =
          realm.query<Person>('name == \$0 LIMIT(2)', ['Luke']);

      // prints `2`
      print(limitedPeopleResults.length);
      // :snippet-end:
      expect(limitedPeopleResults.length, 2);

      await cleanUpRealm(realm);
    });
  });
  group('Write, update, and delete data', () {
    test('Return from write block', () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);

      // :snippet-start: return-from-write
      final yoda = realm.write<Person>(() {
        return realm.add(Person(ObjectId(), 'Yoda'));
      });
      // :snippet-end:
      expect(yoda.name, 'Yoda');
      await cleanUpRealm(realm);
    });

    test("Create an Object", () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      // :snippet-start: create-object
      realm.write(() {
        realm.add(Person(ObjectId(), 'Lando'));
      });
      // :snippet-end:
      expect(realm.all<Person>().first.name, 'Lando');
      await cleanUpRealm(realm);
    });
    test('Create Multiple Objects', () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      // :snippet-start: create-multiple-objects
      realm.write(() {
        realm.addAll([
          Person(ObjectId(), 'Figrin D\'an'),
          Person(ObjectId(), 'Greedo'),
          Person(ObjectId(), 'Toro')
        ]);
      });
      // :snippet-end:
      expect(realm.all<Person>().length, 3);
      await cleanUpRealm(realm);
    });
    test('Update Object Properties', () async {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      final spaceshipTeam = Team(ObjectId(), 'Millennium Falcon Crew',
          crew: [Person(ObjectId(), 'Han'), Person(ObjectId(), 'Chewbacca')]);
      realm.write(() => realm.add(spaceshipTeam));
      // :snippet-start: update-object
      realm.write(() {
        spaceshipTeam.name = 'Galactic Republic Scout Team';
        spaceshipTeam.crew
            .addAll([Person(ObjectId(), 'Luke'), Person(ObjectId(), 'Leia')]);
      });
      // :snippet-end:
      expect(spaceshipTeam.name, 'Galactic Republic Scout Team');
      expect(spaceshipTeam.crew.length, 4);
      await cleanUpRealm(realm);
    });

    test('Upsert data', () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      // :snippet-start: upsert
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
      // :snippet-end:
      final darthAnakin = realm.find<Person>(id);
      expect(darthAnakin!.name, 'Darth Vader');
      await cleanUpRealm(realm);
    });
    test("Delete a single object", () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      final obiWan =
          realm.write((() => realm.add(Person(ObjectId(), 'Obi-Wan'))));
      expect(realm.all<Person>().length, 1);
      // :snippet-start: delete-one-object
      realm.write(() {
        realm.delete(obiWan);
      });
      // :snippet-end:
      expect(realm.all<Person>().length, 0);
      await cleanUpRealm(realm);
    });
    test("Delete multiple objects", () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      final obiWan =
          realm.write((() => realm.add(Person(ObjectId(), 'Obi-Wan'))));
      final quiGon =
          realm.write((() => realm.add(Person(ObjectId(), 'Qui-Gon'))));
      expect(realm.all<Person>().length, 2);
      // :snippet-start: delete-multiple-objects
      realm.write(() {
        realm.deleteMany([obiWan, quiGon]);
      });
      // :snippet-end:
      expect(realm.all<Person>().length, 0);
      await cleanUpRealm(realm);
    });
    test("Delete all objects of a type", () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      realm.write(
        () => realm.addAll<Person>([
          Person(ObjectId(), 'Boba Fett'),
          Person(ObjectId(), 'Jango Fett')
        ]),
      );
      expect(realm.all<Person>().length, 2);
      // :snippet-start: delete-all-objects-of-type
      realm.write(() {
        realm.deleteAll<Person>();
      });
      // :snippet-end:
      expect(realm.all<Person>().length, 0);
      await cleanUpRealm(realm);
    });

    test('Write async', () async {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);
      // :snippet-start: write-async
      // Add Leia to the realm using `writeAsync`
      Person leia = Person(ObjectId(), "Leia");
      realm.writeAsync(() {
        realm.add<Person>(leia);
      });
      // :snippet-end:
      final leiaAgain = realm.query<Person>("name == \$0", ['Leia']);
      expect(leiaAgain.length, 0);
      expect(realm.isInTransaction, true);
      // let transaction resolve
      await delay(500);
      expect(realm.isInTransaction, false);
      expect(realm.query<Person>("name == \$0", ['Leia']).length, 1);
      await cleanUpRealm(realm);
    });
  });
}
