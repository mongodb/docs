// @Skip('currently making whole suite fail due to unknown issues')

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
part 'react_to_changes_test.realm.dart';

// :snippet-start: sample-data-models
@RealmModel()
class _Character {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late String species;
  late int age;
}

@RealmModel()
class _Fellowship {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Character> members;
}
// :snippet-end:

void main() {
  group('change listeners', () {
    late Realm globalRealm;
    late Character globalFrodo;
    late Fellowship globalFellowshipOfTheRing;
    late String globalRealmPath;
    setUpAll(() {
      // :snippet-start: sample-data-seed
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
      // :snippet-end:
      globalRealm = realm;
      globalFrodo = frodo;
      globalFellowshipOfTheRing = fellowshipOfTheRing;
      globalRealmPath = realm.config.path;
    });

    tearDownAll(() {
      globalRealm.close();
      Realm.deleteRealm(globalRealmPath);
    });

    test("Query change listener", () async {
      final realm = globalRealm;
      final fellowshipOfTheRing = globalFellowshipOfTheRing;
      // :snippet-start: query-change-listener
      // Listen for changes on whole collection
      final characters = realm.all<Character>();
      final subscription = characters.changes.listen((changes) {
        changes.inserted; // Indexes of inserted objects.
        changes.modified; // Indexes of modified objects.
        changes.deleted; // Indexes of deleted objects.
        changes.newModified; // Indexes of modified objects after accounting for deletions & insertions.
        changes.moved; // Indexes of moved objects.
        changes.results; // The full List of objects.
        changes.isCleared; // `true` after call to characters.clear(); otherwise, `false`.
      });

      // Listen for changes on RealmResults.
      final hobbits = fellowshipOfTheRing.members.query('species == "Hobbit"');
      final hobbitsSubscription = hobbits.changes.listen((changes) {
        // ... all the same data as above
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));
      // :snippet-start: pause-resume-subscription
      subscription.pause();
      // The changes.listen() method won't fire until subscription is resumed.
      subscription.resume();
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));

      // :snippet-start: cancel-subscription
      await subscription.cancel();
      // :snippet-end:
      await hobbitsSubscription.cancel();
    });
    test("RealmObject change listener", () async {
      final frodo = globalFrodo;
      // :snippet-start: realm-object-change-listener
      final frodoSubscription = frodo.changes.listen((changes) {
        changes.isDeleted; // If the object has been deleted.
        changes.object; // The RealmObject being listened to, `frodo`.
        changes.properties; // The changed properties.
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));

      await frodoSubscription.cancel();
    });
    test("RealmList change listener", () async {
      final fellowshipOfTheRing = globalFellowshipOfTheRing;
      // :snippet-start: realm-list-change-listener
      final fellowshipSubscription =
          fellowshipOfTheRing.members.changes.listen((changes) {
        changes.inserted; // Indexes of inserted objects.
        changes.modified; // Indexes of modified objects.
        changes.deleted; // Indexes of deleted objects.
        changes.newModified; // Indexes of modified objects after accounting for deletions & insertions.
        changes.moved; // Indexes of moved objects.
        changes.list; // The full RealmList of objects.
        changes.isCleared; // `true` after call to fellowshipOfTheRing.members.clear(); otherwise, `false`.
        changes.isCollectionDeleted; // `true` if the collection is deleted; otherwise, `false`.
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));
      await fellowshipSubscription.cancel();
    });
  });
}
