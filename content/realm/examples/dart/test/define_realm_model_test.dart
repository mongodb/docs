import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';

part 'define_realm_model_test.realm.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}

// :snippet-start: modify-schema-model
@RealmModel()
class _Person {
  late String firstName;
  late String lastName;
  late int age;
}
// :snippet-end:

// :snippet-start: map-to
@RealmModel()
@MapTo('naval_ship')
class _Boat {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late int? maxKnots;
  late int? nauticalMiles;
}
// :snippet-end:

// :snippet-start: unstructured-data-model
// Define class with a `RealmValue` property
@RealmModel()
class _EventLog {
  @PrimaryKey()
  late ObjectId id;

  late String eventType;
  late DateTime timestamp;
  late String userId;
  late RealmValue details;
}
// :snippet-end:

main() {
  test('Create a new schema version', () {
    // :snippet-start: schema-version
    final config = Configuration.local([Person.schema], schemaVersion: 2);
    final realm = Realm(config);
    // :snippet-end:
    expect(config.schemaVersion, 2);
    realm.close();
    Realm.deleteRealm(config.path);
  });

  test('Create unstructured data', () {
    final config = Configuration.local([EventLog.schema]);
    final realm = Realm(config);

    // :snippet-start: create-unstructured-data-example
    realm.write(() {
      // Add `eventLog` property data as a map of mixed data, which 
      // also includes nested lists of mixed data 
      realm.add(EventLog(ObjectId(), 'purchase', DateTime.now(), 'user123',
          details: RealmValue.from({
            'ipAddress': '192.168.1.1',
            'items': [
              {'id': 1, 'name': 'Laptop', 'price': 1200.00},
              {'id': 2, 'name': 'Mouse', 'price': 49.99}
            ],
            'total': 1249.99
          })));

      final eventLog = realm.all<EventLog>().first;
      final items = eventLog.details.asMap();
      print('''
          Event Type: ${eventLog.eventType}
          Timestamp: ${eventLog.timestamp}
          User ID: ${eventLog.userId}
          Details:
            Item: 
      ''');
      for (var item in items.entries) {
        print('${item.key}: ${item.value}');
      }
      // :snippet-end:
      expect(items['ipAddress']?.value.toString(), '192.168.1.1');
      expect(items['total']?.value, 1249.99);
    });
    realm.close();
    Realm.deleteRealm(config.path);
  });
}
