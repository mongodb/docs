import 'package:realm/realm.dart';

part 'schemas.realm.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
