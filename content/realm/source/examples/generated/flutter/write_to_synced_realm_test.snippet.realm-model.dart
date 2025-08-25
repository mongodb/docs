@RealmModel()
class _Car {
  @MapTo("_id")
  @PrimaryKey()
  late ObjectId id;

  // This is the queryable field
  late String ownerId;
  late String make;
  late String? model;
  late int? miles;
}
