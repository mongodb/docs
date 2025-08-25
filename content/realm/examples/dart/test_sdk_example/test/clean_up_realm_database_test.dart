// :snippet-start: clean-up-realm-db-test
import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';
import '../lib/schema.dart'; // Import schema used in test

void main() {
  late Realm realm;

  // Close and delete the realm after each test
  tearDown(() {
    final path = realm.config.path;
    realm.close();
    Realm.deleteRealm(path);
  });

  test("Open a local realm", () {
    realm = Realm(Configuration.local([Car.schema]));
    expect(realm.isClosed, isFalse);
  });
}
// :snippet-end:
