// :snippet-start: define-model-flutter
import 'package:realm/realm.dart';

part 'car.realm.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
// :snippet-end:
