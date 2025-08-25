// :replace-start: {
//   "terms": {
//     "migrate_parts": "car"
//   }
// }
// :snippet-start: migrate-model-dart-new
import 'package:realm_dart/realm.dart';

// Update existing declaration from .g.dart to .realm.dart
// part 'car.g.dart';
part 'migrate_parts.realm.dart'; 

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
// :snippet-end:
// :replace-end:
