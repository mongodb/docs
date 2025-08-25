import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';

part 'add_sync_to_app.realm.dart';

@RealmModel()
class _Car {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}

void main() {
  const appId = "flutter-flexible-luccm";

  test("Add Sync to App", () async {
    // :snippet-start: connect-to-app
    final app = App(AppConfiguration(appId));
    // :snippet-end:
    // :snippet-start: log-in
    final user = await app.logIn(Credentials.anonymous());
    // :snippet-end:
    // :snippet-start: opened-synced-realm
    // Configure and open the realm
    final config = Configuration.flexibleSync(user, [Car.schema]);
    final realm = Realm(config);

    // Add subscription to sync all Car objects in the realm
    realm.subscriptions.update((mutableSubscriptions) {
      mutableSubscriptions.add(realm.all<Car>());
    });
    // Sync all subscriptions
    await realm.subscriptions.waitForSynchronization();
    // :snippet-end:

    // :snippet-start: write
    // Write data to realm and it automatically syncs with Atlas
    // in the background.
    realm.write(() {
      realm.add(Car(ObjectId(), 'Toyota', model: 'Rav 4'));
    });
    // :snippet-end:

    // clean up
    realm.write(() => realm.deleteAll<Car>());
    cleanUpRealm(realm, app);
  });
}
