import 'package:test/test.dart';
import './schemas.dart';
import 'package:realm_dart/realm.dart';
import 'dart:math';
import './utils.dart';

void main() {
  group("Encryption - ", () {
    test("Open Realm with encryption key", () async {
      // :snippet-start: encrypt-realm
      // Generate encryption key
      final key = List<int>.generate(64, (i) => Random().nextInt(256));

      final encryptedConfig = Configuration.local([Car.schema],
          path: 'encrypted.realm', // :remove:
          // Include the encryption key in the configuration
          encryptionKey: key);
      final encryptedRealm = Realm(encryptedConfig);
      // :snippet-end:
      expect(encryptedRealm.isClosed, isFalse);
      encryptedRealm.close();

      expect(
          () =>
              Realm(Configuration.local([Car.schema], path: 'encrypted.realm')),
          throwsA(predicate((e) =>
              e is RealmException && e.message.startsWith("Failed to open"))));
      await cleanUpRealm(encryptedRealm);
    });
  });
}
