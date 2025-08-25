import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';
import 'package:path/path.dart' as path;
import 'dart:io';
import './utils.dart';

void main() {
  group('Open and Close a Realm', () {
    test('Open a Realm', () async {
      // :snippet-start: open-realm
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      // :snippet-start: close-realm
      realm.close();
      // :snippet-end:
      expect(realm.isClosed, true);
      await cleanUpRealm(realm);
    });
    test('Configuration - FIFO files fallback path', () async {
      // :snippet-start: fifo-file
      final config = Configuration.local([Car.schema],
          fifoFilesFallbackPath: "./fifo_folder");
      final realm = Realm(config);
      // :snippet-end:
      await cleanUpRealm(realm);
    });
    group('Read-only realm', () {
      test('Configuration readOnly - reading is possible', () async {
        final initConfig = Configuration.local([Car.schema]);
        final writeableRealm = Realm(initConfig);
        writeableRealm
            .write(() => writeableRealm.add(Car(ObjectId(), "Mustang")));
        writeableRealm.close();

        // :snippet-start: read-only-realm
        final config = Configuration.local([Car.schema], isReadOnly: true);
        final realm = Realm(config);
        // :snippet-end:
        var cars = realm.all<Car>();
        expect(cars.isNotEmpty, true);

        var enteredCatch = false;
        try {
          realm.write(() => realm.deleteAll<Car>());
        } catch (_err) {
          enteredCatch = true;
        }
        expect(enteredCatch, true);
        await cleanUpRealm(realm);
      });
    });
    group('In-memory realm', () {
      test('Configuration inMemory - no files after closing realm', () async {
        // :snippet-start: in-memory-realm
        final config = Configuration.inMemory([Car.schema]);
        final realm = Realm(config);
        // :snippet-end:
        realm.write(() => realm.add(Car(ObjectId(), 'Tesla')));
        expect(Realm.existsSync(config.path), true);
        await cleanUpRealm(realm);
      });
    });
    test('Initial data callback', () async {
      bool called = false;
      // :snippet-start: initial-data-callback
      void dataCb(Realm realm) {
        called = true; // :remove:
        realm.add(Car(ObjectId(), 'Honda'));
      }

      final config =
          Configuration.local([Car.schema], initialDataCallback: dataCb);
      final realm = Realm(config);
      Car honda = realm.all<Car>()[0];
      // :snippet-end:
      expect(honda.make, 'Honda');
      expect(called, true);
      await cleanUpRealm(realm);
    });
    group("Customize default configuration", () {
      test("Default realm name and path", () async {
        // :snippet-start: default-realm-name-path
        Configuration.defaultRealmName = "myRealmName.realm";

        final customDefaultRealmPath = path.join(
            (await Directory.systemTemp.createTemp()).path,
            Configuration.defaultRealmName);
        Configuration.defaultRealmPath = customDefaultRealmPath;

        // Configurations used in the application will use these values
        final config = Configuration.local([Car.schema]);
        // The path is your system's temp directory
        // with the file named 'myRealmName.realm'
        print(config.path);
        // :snippet-end:
        expect(config.path.endsWith("myRealmName.realm"), true);
      });
      test("Default storage path", () {
        // :snippet-start: default-storage-path
        final storagePath = Configuration.defaultStoragePath;
        // See value in your application
        print(storagePath);
        // :snippet-end:
        expect(storagePath.length, greaterThan(0));
      });
    });
  });
}
