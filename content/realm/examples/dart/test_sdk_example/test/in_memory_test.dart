// :snippet-start: in-memory-test
import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';
import '../lib/schema.dart'; // Import schema used in test

void main() {
  late Realm realm;
  setUp(() {
    realm = Realm(Configuration.inMemory([Car.schema]));
  });
  tearDown(() {
    realm.close();
  });

  // ...rest of test code
}
// :snippet-end:
