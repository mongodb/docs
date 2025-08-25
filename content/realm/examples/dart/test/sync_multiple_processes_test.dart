// @Skip('hmm')

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'package:path/path.dart' as path;
import './utils.dart';
import './open_flexible_sync_realm_test.dart';

part 'sync_multiple_processes_test.realm.dart';

late App app;
late User currentUser;
const APP_ID = "flutter-flexible-luccm";

@RealmModel()
class _Person {
  @PrimaryKey()
  late String name;
}

void main() {
  group('Sync multiple processes', () {
    setUp(() async {
      final appConfig = AppConfiguration(APP_ID);
      app = App(appConfig);
      final credentials =
          Credentials.emailPassword("bart@example.com", "abc123");
      currentUser = await app.logIn(credentials);
    });
    // Note: This test doesn't actually test what is being documented, b/c the
    // documentation is about working across multiple processes and it's not
    // intuitive to do that within a unit test (which runs in only 1 process)
    test("Sync multiple processes", () async {
      final schema = [Tricycle.schema];
      // :snippet-start: main-process
      // Same realm file location as secondary process
      final realmPath =
          path.join(Configuration.defaultStoragePath, 'synced.realm');

      final flexibleConfig =
          Configuration.flexibleSync(currentUser, schema, path: realmPath);
      final realmWithSync = Realm(flexibleConfig);
      // :snippet-end:
      realmWithSync.subscriptions.update((mutableSubscriptions) {
        mutableSubscriptions.add(realmWithSync.all<Tricycle>());
      });
      realmWithSync.write(() => realmWithSync.add(Tricycle(10, 'MyTri')));
      await realmWithSync.subscriptions.waitForSynchronization();
      realmWithSync.close();
      // :snippet-start: secondary-process
      // Same realm file location as primary process
      final sameRealmPath =
          path.join(Configuration.defaultStoragePath, 'synced.realm');

      final disconnectedSyncConfig =
          Configuration.disconnectedSync(schema, path: sameRealmPath);
      final realmWithDisconnectedSync = Realm(disconnectedSyncConfig);
      // :snippet-end:
      final myTri = realmWithDisconnectedSync.find<Tricycle>(10);
      expect(myTri, isNotNull);
      realmWithSync.close();
      realmWithDisconnectedSync.close();
      // since both realm connections are only for 1 realm, this deletes both
      await cleanUpRealm(realmWithSync, app);
      await cleanUpRealm(realmWithDisconnectedSync, app);
    });
  });
  // Note: These tests for `Realm.refresh()` and `Realm.refreshASync()`
  // don't actually test what is being documented b/c the
  // documentation is about working across multiple processes and it's not
  // intuitive to do that within a unit test (which runs in only 1 process)
  test("Realm.refresh()", () async {
    final realm = Realm(Configuration.local([Person.schema]));
    // :snippet-start: refresh-main-process
    // Add object in one process
    realm.write(() {
      realm.add(Person('John'));
    });
    // :snippet-end:
    // :snippet-start: refresh-secondary-process
    // Call realm.refresh() in the secondary process
    // to trigger the data written in the main process
    // to register in the secondary process.
    realm.refresh();
    final john = realm.find<Person>('John');
    // :snippet-end:
    await cleanUpRealm(realm);
  });
  test("Realm.refreshAsync()", () async {
    final realm = Realm(Configuration.local([Person.schema]));
    realm.write(() {
      realm.add(Person('John'));
    });
    // :snippet-start: refresh-async
    // Asynchronously refresh the realm in the background.
    await realm.refreshAsync();
    final john = realm.find<Person>('John');
    // :snippet-end:
    await cleanUpRealm(realm);
  });
}
