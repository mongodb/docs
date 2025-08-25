import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

part 'manage_sync_subscription_test.realm.dart';

@RealmModel()
class _Plane {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
  late int numSeats;
}

@RealmModel()
class _Train {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
  late int numCars;
}

@RealmModel()
class _Boat {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
  late int tonnage;
}

late App app;
late Realm realm;
late User currentUser;
const APP_ID = "flutter-flexible-luccm";
void main() {
  group('Manage sync subscriptions', () {
    setUpAll(() async {
      final appConfig = AppConfiguration(APP_ID);
      app = App(appConfig);
      final credentials =
          Credentials.emailPassword("lisa@example.com", "abc123");
      currentUser = await app.logIn(credentials);
    });

    tearDownAll(() async {
      await app.currentUser?.logOut();
    });

    setUp(() async {
      final config = Configuration.flexibleSync(
        currentUser,
        [Plane.schema, Train.schema, Boat.schema],
        path: 'flex-${generateRandomString(10)}.realm',
      );

      realm = Realm(config);
      await realm.subscriptions.waitForSynchronization();
      final planeQuery = realm.all<Plane>();
      final longTrainQuery = realm.all<Train>().query("numCars >= 4");
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.add(planeQuery, name: "all-planes"); // +1
        mutableSubscriptions.add(longTrainQuery, name: 'long-trains'); // +1
      });
      await realm.subscriptions.waitForSynchronization();
    });

    tearDown(() async {
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.clear();
      });
      await realm.subscriptions.waitForSynchronization();
      realm.close();
      await Future.delayed(Duration(milliseconds: 300));
      Realm.deleteRealm(realm.config.path);
    });

    // Starting with 2 subscriptions from setUp: all-planes, long-trains
    test('Add query to subscription set', () async {
      // :snippet-start: add-subscription
      final planeQuery = realm.all<Plane>();
      final longTrainQuery = realm.query<Train>("numCars >= 5");
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.add(planeQuery, name: "planes");
        mutableSubscriptions.add(longTrainQuery,
            name: 'long-trains', update: true);
      });
      await realm.subscriptions.waitForSynchronization();
      // :snippet-end:
      expect(realm.subscriptions.length, 3); // +1 subscription
    });

    test('Get subscriptions', () async {
      // :snippet-start: get-subscriptions
      final subscriptions = realm.subscriptions;
      // :snippet-end:
      expect(subscriptions.length, 2); // +0
    });

    test('Wait for subscription changes to sync', () async {
      // :snippet-start: wait-for-subscription-change
      await realm.subscriptions.waitForSynchronization();
      // :snippet-end:
      expect(realm.subscriptions.state, SubscriptionSetState.complete);
    });

    test('Update subscriptions with new query', () async {
      // :snippet-start: update-subscriptions-new-query
      final longerTrainQuery = realm.query<Train>("numCars > 10");

      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.add(longerTrainQuery,
            name: 'long-trains', update: true);
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 2); // +0
      expect(realm.subscriptions.findByName('long-trains')?.queryString.trim(),
          "numCars > 10");
    });

    test('Remove subscription by query', () async {
      // :snippet-start: remove-subscriptions-by-query
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.removeByQuery(realm.all<Plane>());
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1); // -1
    });

    test('Remove subscription by name', () async {
      // :snippet-start: remove-subscriptions-by-name
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.removeByName('long-trains');
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1); // -1
    });

    test('Remove all subscriptions by reference', () async {
      // :snippet-start: remove-subscriptions-by-reference
      final sub = realm.subscriptions[0];
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.remove(sub);
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1); // -1
    });

    test('Remove all subscriptions by object type', () async {
      // :snippet-start: remove-subscriptions-by-object-type
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.removeByType<Train>();
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1); // -1
    });

    test('Remove all subscriptions', () async {
      // :snippet-start: remove-all-subscriptions
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.clear();
      });
      // :snippet-end:
      expect(realm.subscriptions, isEmpty); // clear all
    });

    test('Add query with subscribe api', () async {
      // :snippet-start: add-subscription-subscribe-api
      final boatQuery = realm.all<Boat>();
      final bigPlaneQuery = realm.query<Plane>("numSeats > 100");

      final boatSubscription = await boatQuery.subscribe(name: "boats");
      final planeSubscription =
          await bigPlaneQuery.subscribe(name: "big-planes");
      // :snippet-end:
      expect(realm.subscriptions.length, 4); // +2
      expect(realm.subscriptions.findByName("boats")?.queryString.trim(),
          "TRUEPREDICATE");
      expect(realm.subscriptions.findByName("big-planes")?.queryString.trim(),
          "numSeats > 100");
    });

    test('Update query with subscribe api', () async {
      final planeQuery = realm.query<Plane>("numSeats > 100");
      planeQuery.subscribe(name: "big-planes");
      // :snippet-start: update-subscription-subscribe-api
      final updatedPlaneQuery = realm.query<Plane>("numSeats > 200");

      final planeSubscription =
          await updatedPlaneQuery.subscribe(name: "big-planes", update: true);
      // :snippet-end:
      expect(realm.subscriptions.length, 3); // +1
      final updatedSubscription = realm.subscriptions.findByName("big-planes");
      expect(updatedSubscription?.queryString.trim(), "numSeats > 200");
    });

    test('Wait for query to sync with subscribe api', () async {
      realm.write(() {
        realm.deleteAll<Plane>();
        realm.addAll([Plane(1, "Plane1", 201), Plane(2, "Plane2", 50)]);
      });
      realm.syncSession
          .waitForUpload(TimeoutCancellationToken(Duration(seconds: 5)));
      // :snippet-start: wait-first-time-subscribe-api
      final bigPlaneQuery = realm.query<Plane>("numSeats > 100");

      final planeSubscription = await bigPlaneQuery.subscribe(
        name: "firstTimeSync",
        waitForSyncMode: WaitForSyncMode.firstTime,
      );
      // :snippet-end:
      expect(realm.subscriptions.length, 3); // +1
      expect(bigPlaneQuery.length, 1);
    });

    test('Wait with timeout with subscribe api', () async {
      realm.write(() {
        realm.deleteAll<Plane>();
        realm.addAll([Plane(1, "Plane1", 201), Plane(2, "Plane2", 500)]);
      });
      // :snippet-start: wait-with-timeout-subscribe-api
      final bigPlaneQuery = realm.query<Plane>("numSeats > 200");

      final planeSubscription = await bigPlaneQuery.subscribe(
        name: "alwaysWaitSync",
        waitForSyncMode: WaitForSyncMode.always,
        cancellationToken: TimeoutCancellationToken(Duration(seconds: 5)),
      );
      // :snippet-end:
      expect(realm.subscriptions.length, 3); // +1
      expect(bigPlaneQuery.length, 2);
    });

    test('Remove subscription with unsubscribe api', () async {
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.clear();
      });

      final planeQuery = realm.all<Plane>();
      final trainQuery = realm.all<Train>();
      // :snippet-start: remove-subscription-unsubscribe-api
      planeQuery.unsubscribe();
      trainQuery.unsubscribe();
      // :snippet-end:

      await realm.subscriptions.waitForSynchronization();
      expect(realm.subscriptions, isEmpty);
    });
  });
}
