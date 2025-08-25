import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';
import '../lib/schema.dart'; // Import schema used in test

void main() {
  late App app;
  late Realm realm;

  setUp(() async {
    app = App(AppConfiguration(TEST_APP_ID));
    await app.logIn(Credentials.anonymous());
  });

  // Log current user out
  tearDown(() async {
    // Delete all items in the realm so that the items are not persisted in Atlas
    // and do not re-sync in subsequent tests.
    realm.write(() => realm.deleteAll<Car>());

    // Fully synchronize realm before closing and deleting
    await realm.syncSession.waitForDownload();
    await realm.syncSession.waitForUpload();

    // Get path before realm closed to pass to Realm.deleteRealm()
    final path = realm.config.path;

    realm.close();
    Realm.deleteRealm(path);

    await app.currentUser?.logOut();
  });

  test("Add subscriptions", () async {
    const subName = 'allDogs';
    final user = app.currentUser!;
    realm = Realm(Configuration.flexibleSync(user, [Car.schema]));
    realm.subscriptions.update((mutableSubscriptions) {
      mutableSubscriptions.add(realm.all<Car>(), name: subName);
    });
    await realm.subscriptions.waitForSynchronization();

    expect(realm.subscriptions.findByName(subName), isA<Subscription>());
  });
}
