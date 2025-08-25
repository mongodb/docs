import 'package:realm/realm.dart';

part 'schema.realm.dart';

@RealmModel()
class _Car {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
