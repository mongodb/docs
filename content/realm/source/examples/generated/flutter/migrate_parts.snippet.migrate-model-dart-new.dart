import 'package:realm_dart/realm.dart';

// Update existing declaration from .g.dart to .realm.dart
// part 'car.g.dart';
part 'car.realm.dart'; 

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
