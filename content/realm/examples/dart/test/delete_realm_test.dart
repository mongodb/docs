import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';
import 'dart:io';
import './utils.dart';

void main() {
  test('Delete a Realm', () async {
    final config = Configuration.local([Car.schema]);
    final realm = Realm(config);
    // :snippet-start: delete-realm
    //Get realm's file path
    final path = realm.config.path;

    // You must close a realm before deleting it
    realm.close();

    // Delete the realm
    Realm.deleteRealm(path);
    // :snippet-end:
    expect(realm.isClosed, true);
    expect(await File(path).exists(), isFalse);

    await cleanUpRealm(realm);
  });
}
