// :snippet-start: default-realm-test
import 'dart:math';
import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';

// Utility function to generate random realm name
String generateRandomRealmName(int len) {
  final r = Random();
  const _chars =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  final nameBase =
      List.generate(len, (index) => _chars[r.nextInt(_chars.length)]).join();
  return '$nameBase.realm';
}

void main() {
  // Set default Realm name before each test
  setUp(() {
    Configuration.defaultRealmName = generateRandomRealmName(10);
  });

  // ...rest of test code
}
// :snippet-end:
