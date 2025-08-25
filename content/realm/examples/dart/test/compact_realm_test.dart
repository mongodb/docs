import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

void main() {
  group('Compact a Realm', () {
    test('Compact a Realm with callback', () async {
      // :snippet-start: compact-with-callback
      final config = Configuration.local([Car.schema],
          shouldCompactCallback: ((totalSize, usedSize) {
        // shouldCompactCallback sizes are in bytes.
        // For convenience, this example defines a const
        // representing a byte to MB conversion for compaction
        // at an arbitrary 10MB file size.
        const tenMB = 10 * 1048576;
        return totalSize > tenMB;
      }));
      final realm = Realm(config);
      // :snippet-end:
      realm.close();
      await cleanUpRealm(realm);
    });
    test('Compact a Realm with callback plus logic', () async {
      // :snippet-start: compact-with-callback-and-logic
      final config = Configuration.local([Car.schema],
          shouldCompactCallback: ((totalSize, usedSize) {
        // Compact if the file is over 10MB in size and less than 50% 'used'
        const tenMB = 10 * 1048576;
        return (totalSize > tenMB) &&
            (usedSize.toDouble() / totalSize.toDouble()) < 0.5;
      }));
      final realm = Realm(config);
      // :snippet-end:
      realm.close();
      await cleanUpRealm(realm);
    });

    test('Compact a realm using static method', () async {
      // :snippet-start: compact-static-method
      final config = Configuration.local([Car.schema]);

      // :remove-start:
      // Populate some data in the realm so we can compact it
      final prepareRealm = Realm(config);
      Car newPrius = Car(ObjectId(), "Toyota", model: "Prius", miles: 0);
      Car usedOutback =
          Car(ObjectId(), "Subaru", model: "Outback Premium", miles: 61370);
      prepareRealm.write(() {
        prepareRealm.add<Car>(newPrius);
        prepareRealm.add<Car>(usedOutback);
      });
      prepareRealm.write(() {
        prepareRealm.delete(usedOutback);
      });
      prepareRealm.close();
      // :remove-end:
      final compacted = Realm.compact(config);
      print(
          "Successfully compacted the realm: $compacted"); // On success, this prints "true"

      final realm = Realm(config);
      // :snippet-end:
      expect(compacted, true);
      realm.close();
      await cleanUpRealm(realm);
      await cleanUpRealm(prepareRealm);
    });
  });
}
