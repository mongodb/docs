import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';

import 'utils.dart';

part 'write_to_synced_realm_test.realm.dart';

// NOTE: this is a unique App ID from the other Flutter tests
// because these examples require unique sync permissions.
const APP_ID = 'write-flex-sync-data-hvpxi';

// :snippet-start: realm-model
@RealmModel()
class _Car {
  @MapTo("_id")
  @PrimaryKey()
  late ObjectId id;

  // This is the queryable field
  late String ownerId;
  late String make;
  late String? model;
  late int? miles;
}
// :snippet-end:

main() async {
  // :snippet-start: subscription-setup
  final app = App(AppConfiguration(APP_ID));
  final user = await app.logIn(Credentials.anonymous());
  final config = Configuration.flexibleSync(user, [Car.schema]);
  final realm = Realm(config);

  // Add subscriptions
  realm.subscriptions.update((mutableSubscriptions) {
    // Get Cars from Atlas that match the Realm Query Language query.
    // Uses the queryable field `miles`.
    // Query matches cars with less than 100 miles or `null` miles.
    final newCarQuery = realm.query<Car>("miles < 100 OR miles == \$0", [null]);
    mutableSubscriptions.add(newCarQuery, name: "new-car-subscription");
  });
  await realm.subscriptions.waitForSynchronization();
  // :snippet-end:
  tearDownAll(() async {
    cleanUpRealm(realm, app);
  });
  tearDown(() async {
    realm.write(() => realm.deleteAll<Car>());
    await realm.syncSession.waitForUpload();
    await realm.syncSession.waitForDownload();
  });

  test("Write to a synced realm", () async {
    // :snippet-start: write-synced-realm
    // Per the Device Sync permissions, users can only read and write data
    // where the `Car.ownerId` property matches their own user ID.
    final userId = user.id;

    realm.write(() {
      // WRITE SUCCEEDS
      // `newCar` is successfully written to the realm and synced to Atlas
      // because it's data matches the subscription query (miles < 100)
      // and it's `ownerId` field matches the user ID.
      final newCar = Car(ObjectId(), userId, 'Toyota', miles: 2);
      realm.add(newCar);
    });
    // :snippet-end:
    // sync changes
    await realm.syncSession.waitForUpload();
    await realm.syncSession.waitForDownload();

    expect(realm.all<Car>().length, 1);
  });

  test("Compensating writes - don't match query subscription", () async {
    // :snippet-start: not-match-query-subscription
    final carId = ObjectId();
    final ownerId = app.currentUser!.id;

    realm.write(() {
      // WRITE REVERTED BY QUERY SUBSCRIPTION COMPENSATING WRITE
      // `oldCar` is initially written to the realm, then later removed
      // in a compensating write when the server processes the write.
      // This is because the `miles` property of `oldCar` doesn't match
      // the subscription query, which is only for cars with less than 100 miles.
      final oldCar = Car(carId, ownerId, 'Honda', miles: 90000);
      realm.add(oldCar);
    });

    // Let changes sync to and from server
    await realm.syncSession.waitForUpload();
    await realm.syncSession.waitForDownload();

    final noCar = realm.find<Car>(carId);
    // The Car is no longer in the realm because of
    // the compensating write from the server.
    expect(noCar, isNull);
    // :snippet-end:
  });
  test("Compensating writes - don't match permissions", () async {
    // :snippet-start: not-match-permissions
    final carId = 'someOtherId';

    realm.write(() {
      // WRITE REVERTED BY PERMISSION ERROR
      // `otherUsersCar` is initially written to the realm, then removed upon synchronization
      // because it's `ownerId` property doesn't match the user ID of the user
      // making the request.
      final otherUsersCar = Car(ObjectId(), carId, 'Ford');
      realm.add(otherUsersCar);
    });

    // sync changes
    await realm.syncSession.waitForUpload();
    await realm.syncSession.waitForDownload();

    final noCar = realm.find<Car>(carId);
    // The Car is no longer in the realm because of
    // the compensating write from the server.
    expect(noCar, isNull);
    // :snippet-end:
  });
}
