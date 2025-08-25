import 'dart:developer';

import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';
import 'dart:typed_data';

import 'utils.dart';

part 'data_types_test.realm.dart';
// :snippet-start: data-types-example-model

// :uncomment-start:
// part 'car.realm.dart';
// :uncomment-end:

// :snippet-start: embedded-object-model
// The generated `Address` class is an embedded object.
@RealmModel(ObjectType.embeddedObject)
class _Address {
  late String street;
  late String city;
  late String state;
  late String country;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String name;

  // Embedded object in parent object schema
  late _Address? address; // Must be nullable
}
// :snippet-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  String? licensePlate;
  bool isElectric = false;
  double milesDriven = 0;
  late List<String> attributes;
  late _Person? owner;
}
// :snippet-end:

// :snippet-start: uuid-model
@RealmModel()
class _UuidPrimaryKey {
  @PrimaryKey()
  late Uuid id;
}
// :snippet-end:

// :snippet-start: objectid-model
@RealmModel()
class _ObjectIdPrimaryKey {
  @PrimaryKey()
  late ObjectId id;
}
// :snippet-end:

// :snippet-start: realm-value-model
@RealmModel()
class _RealmValueExample {
  @Indexed()
  late RealmValue singleAnyValue;
  late List<RealmValue> listOfMixedAnyValues;
  late Set<RealmValue> setOfMixedAnyValues;
  late Map<String, RealmValue> mapOfMixedAnyValues;
}
// :snippet-end:

@RealmModel()
class _RealmValueCollectionExample {
  @Indexed()
  late RealmValue singleAnyValue;
}

// :snippet-start: datetime-model
@RealmModel()
class _Vehicle {
  @PrimaryKey()
  late ObjectId id;

  late String nickname;
  late DateTime dateLastServiced;
}
// :snippet-end:

// :snippet-start: realmlist-model
@RealmModel()
class _Player {
  @PrimaryKey()
  late ObjectId id;

  late String username;
  // `inventory` property of type RealmList<Item>
  // where Items are other RealmObjects
  late List<_Item> inventory;
  // `traits` property of type RealmList<String>
  // where traits are Dart Strings.
  late List<String> traits;
}

@RealmModel()
class _Item {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late String description;
}
// :snippet-end:

// :snippet-start: realm-set-model
@RealmModel()
class _RealmSetExample {
  late Set<String> primitiveSet;
  late Set<int?> nullablePrimitiveSet;
  late Set<_SomeRealmModel> realmObjectSet;
}

@RealmModel()
class _SomeRealmModel {
  late ObjectId id;
}
// :snippet-end:

// :snippet-start: binary-model
@RealmModel()
class _BinaryExample {
  late String name;
  late Uint8List requiredBinaryProperty;
  late Uint8List? nullableBinaryProperty;
}
// :snippet-end:

// :snippet-start: map-model
@RealmModel()
class _MapExample {
  late Map<String, int> map;
  late Map<String, int?> nullableMap;
}
// :snippet-end:

main() {
  setUp(() async {
    final config = Configuration.local([RealmValueExample.schema]);
    final realm = Realm(config);

    realm.write(() => realm.deleteAll<RealmValueExample>());
    await delay(300);

    realm.close();
    await delay(300);

    Realm.deleteRealm(realm.config.path);
    await delay(300);
  });

  test('Uuid', () {
    // :snippet-start: uuid-use
    final myId = Uuid.v4();
    final object = UuidPrimaryKey(myId);
    // :snippet-end:
    expect(myId.toString(), isA<String>());
    expect(myId, object.id);
  });
  test('ObjectId', () {
    // :snippet-start: objectid-use
    final id = ObjectId();
    final object = ObjectIdPrimaryKey(id);
    // :snippet-end:
    expect(object.id.toString(), isA<String>());
  });

  group('RealmValue - ', () {
    test("RealmValue.from()", () async {
      // :snippet-start: realm-value-from
      final realm = Realm(Configuration.local([RealmValueExample.schema]));

      realm.write(() {
        // Use 'RealmValue.from()' to set values
        var anyValue = realm.add(RealmValueExample(
            // Add a single `RealmValue` value
            singleAnyValue: RealmValue.from(1),
            // Add a list of `RealmValue` values
            listOfMixedAnyValues: [Uuid.v4(), 'abc', 123].map(RealmValue.from),
            // Add a set of `RealmValue` values
            setOfMixedAnyValues: {
              RealmValue.from('abc'),
              RealmValue.from('def')
            },
            // Add a map of string keys and `RealmValue` values
            mapOfMixedAnyValues: {
              '1': RealmValue.from(123),
              '2': RealmValue.from('abc')
            }));

        // Use 'RealmValue.nullValue()' to set null values
        var anyValueNull = realm.add(RealmValueExample(
            singleAnyValue: RealmValue.nullValue(),
            listOfMixedAnyValues: [null, null].map(RealmValue.from),
            setOfMixedAnyValues: {RealmValue.nullValue()},
            mapOfMixedAnyValues: {'null': RealmValue.nullValue()}));

        // :remove-start:
        expect(anyValue.singleAnyValue.type, RealmValueType.int);
        expect(anyValue.listOfMixedAnyValues[1].value.toString(), 'abc');
        expect(anyValue.setOfMixedAnyValues.first.value, 'abc');
        expect(
            anyValue.mapOfMixedAnyValues.containsValue(RealmValue.from('abc')),
            true);
        expect(anyValueNull.singleAnyValue.value, null);
        expect(anyValueNull.listOfMixedAnyValues[0].value, null);
        expect(anyValueNull.setOfMixedAnyValues.first.value, null);
        expect(anyValueNull.mapOfMixedAnyValues.containsValue(null), true);
      });
      // :remove-end:
      // :snippet-end:
      await cleanUpRealm(realm);
    });
    test("RealmValueType and RealmValue.value", () async {
      final realm = Realm(Configuration.local([RealmValueExample.schema]));
      realm.write(() {
        realm.addAll([
          RealmValueExample(
              singleAnyValue: RealmValue.from(1),
              listOfMixedAnyValues:
                  [Uuid.v4(), 'abc', 123].map(RealmValue.from),
              mapOfMixedAnyValues: {
                '1': RealmValue.from(123),
                '2': RealmValue.from('abc')
              }),
          RealmValueExample(
              singleAnyValue: RealmValue.nullValue(),
              listOfMixedAnyValues: [null, null].map(RealmValue.from),
              mapOfMixedAnyValues: {'null': RealmValue.nullValue()})
        ]);
      });
      var approximateAge = 0;
      // :snippet-start: realm-value-type
      final data = realm.all<RealmValueExample>();
      for (var obj in data) {
        final anyValue = obj.singleAnyValue;
        // Access the RealmValue.type property
        switch (anyValue.type) {
          // Work with the returned RealmValueType enums
          case RealmValueType.int:
            approximateAge = DateTime.now().year - anyValue.as<int>();
            break;
          case RealmValueType.dateTime:
            approximateAge =
                (DateTime.now().difference(anyValue.as<DateTime>()).inDays /
                        365)
                    .floor();
            break;
          case RealmValueType.string:
            final birthday = DateTime.parse(anyValue.as<String>());
            approximateAge =
                (DateTime.now().difference(birthday).inDays / 365).floor();
            break;
          // Handle other possible types ...
          default:
            log('Unhandled type: ${anyValue.type}');
        }
      }
      // :snippet-end:
      expect(approximateAge, 2023);
      int sum = 0;
      String combinedStrings = '';
      // :snippet-start: realm-value-value
      for (var obj in data) {
        for (var mixedValue in obj.listOfMixedAnyValues) {
          // Use RealmValue.value to access the value
          final value = mixedValue.value;
          if (value is int) {
            sum = sum + value;
            expect(sum, 123); // :remove:
          } else if (value is String) {
            combinedStrings += value;
            expect(combinedStrings, 'abc'); // :remove:
          }

          // Use RealmValue.as<T> to cast value to a specific type
          try {
            final intValue = mixedValue.as<int>();
            sum = sum + intValue;
            expect(sum, 246); // :remove:
          } catch (e) {
            log('Error casting value to int: $e');
          }
        }
      }
      // :snippet-end:
      await cleanUpRealm(realm);
    });
    test('Nested collections of mixed data', () async {
      final realm =
          Realm(Configuration.local([RealmValueCollectionExample.schema]));

      // :snippet-start: realm-value-nested-collections
      realm.write(() {
        realm.add(RealmValueCollectionExample(
            // Set the RealmValue as a map of mixed data
            singleAnyValue: RealmValue.from({
          'int': 1,
          // You can nest RealmValues in collections
          'listOfInt': [2, 3, 4],
          'mapOfStrings': {'1': 'first', '2': 'second'},
          // You can also nest collections within collections
          'mapOfMaps': [
            {
              'nestedMap_1': {'1': 1, '2': 2},
              'nestedMap_2': {'3': 3, '4': 4}
            }
          ],
          'listOfMaps': [
            {
              'nestedList_1': [1, 2, 3],
              'nestedList_2': [4, 5, 6]
            }
          ]
        })));
        // :snippet-end:
        final collectionsOfMixed =
            realm.all<RealmValueCollectionExample>().first;
        final mapValue = collectionsOfMixed.singleAnyValue.asMap();
        expect(mapValue.length, 5);
        expect(mapValue.containsKey('mapOfStrings'), true);
        expect(mapValue['mapOfMaps']?.asList()[0].asMap().length, 2);
      });
      await cleanUpRealm(realm);
    });
  });
  test('DateTime', () async {
    final config = Configuration.local([Vehicle.schema]);
    final realm = Realm(config);

    // :snippet-start: datetime-use
    // Create a Realm object with date in UTC, or convert with .toUtc() before storing
    final subaruOutback = realm.write<Vehicle>(() {
      return realm.add(
          Vehicle(ObjectId(), 'Subie', DateTime.utc(2022, 9, 18, 12, 30, 0)));
    });

    final fordFusion =
        Vehicle(ObjectId(), 'Fuse', DateTime(2022, 9, 18, 8, 30, 0).toUtc());
    realm.write(() {
      realm.add(fordFusion);
    });

    // When you query the object, the `DateTime` returned is UTC
    final queriedSubaruOutback =
        realm.all<Vehicle>().query('nickname == "Subie"')[0];
    expect(queriedSubaruOutback.nickname, 'Subie'); // :remove:

    // If your app needs it, convert it to Local() or the desired time zone
    final localizedSubieDateLastServiced =
        queriedSubaruOutback.dateLastServiced.toLocal();
    // :snippet-end:
    expect(
        subaruOutback.dateLastServiced.toString(), '2022-09-18 12:30:00.000Z');

    final queriedSubieDate = queriedSubaruOutback.dateLastServiced.toString();
    expect(queriedSubieDate, '2022-09-18 12:30:00.000Z');

    await cleanUpRealm(realm);
  });

  test("RealmList", () async {
    final config = Configuration.local([Player.schema, Item.schema]);
    final realm = Realm(config);
    // :snippet-start: realmlist-use
    final artemis =
        realm.write(() => realm.add(Player(ObjectId(), 'Art3mis', inventory: [
              Item(ObjectId(), 'elvish sword', 'sword forged by elves'),
              Item(ObjectId(), 'body armor', 'protects player from damage'),
            ], traits: [
              'brave',
              'kind'
            ])));

    // Get a RealmList by property name with dynamic.getList()
    final inventory = artemis.dynamic.getList('inventory');

    // Use RealmList methods to filter results
    RealmList<String> traits = artemis.traits;
    final brave = traits.firstWhere((element) => element == 'brave');

    final elvishSword =
        artemis.inventory.where((item) => item.name == 'elvish sword').first;

    // Query RealmList with Realm Query Language
    final playersWithBodyArmor =
        realm.query<Player>("inventory.name == \$0", ['body armor']);
    print("LEN ${playersWithBodyArmor.length}");
    // :snippet-end:
    expect(inventory.length, 2);
    expect(brave, 'brave');
    expect(elvishSword.name, 'elvish sword');
    expect(playersWithBodyArmor.length, 1);
    await cleanUpRealm(realm);
  });

  test("RealmResults", () async {
    final config = Configuration.local([Player.schema, Item.schema]);
    final realm = Realm(config);
    final artemis = realm.write(() => realm.addAll([
          Player(ObjectId(), 'Art3mis', inventory: [
            Item(ObjectId(), 'elvish sword', 'sword forged by elves'),
            Item(ObjectId(), 'body armor', 'protects player from damage'),
          ], traits: [
            'brave',
            'kind'
          ]),
          Player(ObjectId(), 'Percival')
        ]));
    // :snippet-start: realmresults-use
    RealmResults<Player> players = realm.all<Player>();
    RealmResults<Player> bravePlayers =
        realm.query<Player>('ANY traits == \$0', ['brave']);
    // :snippet-end:
    expect(players.length, 2);
    expect(bravePlayers.length, 1);
    await cleanUpRealm(realm);
  });

  test("Embedded objects", () async {
    // :snippet-start: embedded-object-examples
    // Both parent and embedded objects in schema
    final realm = Realm(Configuration.local([Person.schema, Address.schema]));

    // Create an embedded object.
    final joesHome = Address("500 Dean Street", "Brooklyn", "NY", "USA");
    final joePrimaryKey = ObjectId();
    final joe = Person(joePrimaryKey, "Joe", address: joesHome);
    realm.write(() => realm.add(joe));
    expect(realm.find<Person>(joePrimaryKey), isNotNull); // :remove:

    // Update an embedded object property.
    realm.write(() {
      joe.address?.street = "800 Park Place";
    });
    // :remove-start:
    expect(
        realm.find<Person>(joePrimaryKey)?.address?.street, "800 Park Place");
    // :remove-end:

    // Query a collection of embedded objects.
    // You must access the embedded object through the parent RealmObject type.
    final peopleWithNewYorkHomes = realm.query<Person>("address.state = 'NY'");
    expect(peopleWithNewYorkHomes.length, 1); // :remove:

    // Overwrite an embedded object.
    // Also deletes original embedded object from realm.
    final joesNewHome = Address("12 Maple Way", "Toronto", "ON", "Canada");
    realm.write(() {
      joe.address = joesNewHome;
    });
    // :remove-start:
    expect(realm.dynamic.all("Address").query("state == 'NY'").length, 0);
    // :remove-end:

    // You can access the parent object from an embedded object.
    final thePersonObject = joesNewHome.parent;
    // :remove-start:
    expect(thePersonObject, isNotNull);
    // :remove-end:

    // Delete embedded object from parent object.
    realm.write(() => realm.delete(joe.address!));
    expect(joe.address, isNull); // :remove:

    // Add address back for the following example.
    final anotherNewHome = Address("202 Coconut Court", "Miami", "FL", "USA");
    realm.write(() {
      joe.address = anotherNewHome;
    });
    // Deleting the parent object also deletes the embedded object.
    realm.write(() => realm.delete(joe));

    // :snippet-end:
    expect(realm.find<Person>(joePrimaryKey), isNull); // :remove:
    expect(realm.dynamic.all("Address").length, 0);
    await cleanUpRealm(realm);
  });
  test("RealmSet", () async {
    // :snippet-start: realm-set-examples
    final realm = Realm(
        Configuration.local([RealmSetExample.schema, SomeRealmModel.schema]));

    // Pass native Dart Sets to the object to create RealmSets
    final setExample = RealmSetExample(
        primitiveSet: {'apple', 'pear'},
        nullablePrimitiveSet: {null, 2, 3},
        realmObjectSet: {SomeRealmModel(ObjectId())});
    // Add RealmObject to database
    realm.write(() => realm.add(setExample));

    // Once you add the sets, they are of type RealmSet
    RealmSet primitiveSet = setExample.primitiveSet;

    // Modify RealmSets of RealmObjects in write transactions
    realm.write(() {
      // Add element to a RealmSet with RealmSet.add()
      setExample.realmObjectSet.add(SomeRealmModel(ObjectId()));
      // Remove element from a RealmSet with RealmSet.remove()
      setExample.primitiveSet.remove('pear');
    });

    // Check if a RealmSet contains an element with RealmSet.contains()
    if (setExample.primitiveSet.contains('apple')) {
      print('Set contains an apple');
    }

    // Get RealmSet by property name with dynamic.getSet()
    final getSetResult = setExample.dynamic.getSet('primitiveSet');

    // Check number of elements in a RealmSet with RealmSet.length
    print(
        'Set now has ${getSetResult.length} elements'); // Prints 'Set now has 1 elements'

    // Query RealmSets using Realm Query Language
    final results =
        realm.query<RealmSetExample>('\$0 IN nullablePrimitiveSet', [null]);
    // :snippet-end:
    expect(primitiveSet, isA<RealmSet<String>>());
    expect(getSetResult.contains('pear'), isFalse);
    expect(getSetResult.contains('apple'), isTrue);
    expect(setExample.realmObjectSet.length, 2);
    expect(results.length, 1);
    await cleanUpRealm(realm);
  });

  test("Binary - Uint8List.fromList()", () async {
    // :snippet-start: binary-from-list
    final realm = Realm(Configuration.local([BinaryExample.schema]));

    realm.write(() {
      realm.addAll([
        BinaryExample("Example binary object", Uint8List.fromList([1, 2]))
      ]);
    });
    // :snippet-end:

    final testObject =
        realm.query<BinaryExample>("name == 'Example binary object'");

    expect(testObject.first, isNotNull);
    expect(testObject.first.requiredBinaryProperty, Uint8List.fromList([1, 2]));

    print(testObject.length);
    await cleanUpRealm(realm);
  });

  test("Map model", () async {
    // :snippet-start: map-work-with
    final realm = Realm(Configuration.local([MapExample.schema]));

    // Pass native Dart Maps to the object to create RealmMaps
    final mapExample = MapExample(
      map: {
        'first': 1,
        'second': 2,
        'third': 3,
      },
      nullableMap: {
        'first': null,
        'second': 2,
        'third': null,
      },
    );
    // Add RealmObject to the database
    realm.write(() => realm.add(mapExample));

    // Once you add maps, they are of type RealmMap
    RealmMap map = mapExample.map;

    // :remove-start:
    final realmMap = realm.all<MapExample>()[0];
    expect(realmMap, isA<MapExample>());
    expect(realmMap.map['third'], 3);
    expect(realmMap.nullableMap['third'], null);
    // :remove-end:
    // Modify RealmMaps in write transactions
    realm.write(() {
      // Update value by key with .update() or [value] = newValue
      mapExample.nullableMap['second'] = null;
      mapExample.map.update('first', (value) => 5);
      mapExample.nullableMap.update('fourth', (v) => 4, ifAbsent: () => null);

      // Add a new map entry with .addEntries()
      const newMap = {'fourth': 4};
      mapExample.map.addEntries(newMap.entries);
    });
    // :remove-start:
    expect(realmMap.nullableMap['second'], null);
    expect(realmMap.map['first'], 5);
    expect(realmMap.nullableMap['fourth'], null);
    // :remove-end:

    // Check a RealmMap with .containsKey() or .containsValue()
    if (mapExample.map.containsKey('first')) {
      print('Map contains key "first"');
    } else if (mapExample.map.containsValue(null)) {
      print('Map contains null value');
    } else {
      print('These aren\'t the maps you\'re looking for');
    }

    // Get a RealmMap by property name with dynamic.getMap()
    final getPrimitiveMap = mapExample.dynamic.getMap('map');

    // Check the number of elements in a RealmMap with RealmMap.length
    print(
        'Map contains ${getPrimitiveMap.length} elements'); // Prints 'Map contains 4 elements'

    // Query RealmMaps using Realm Query Language
    final results = realm.query<MapExample>('map.first == \$0', [5]);
    // :snippet-end:

    expect(results.length, 1);
    expect(getPrimitiveMap.length, 4);
    expect(realmMap.nullableMap.length, 4);
    await cleanUpRealm(realm);
  });
}
