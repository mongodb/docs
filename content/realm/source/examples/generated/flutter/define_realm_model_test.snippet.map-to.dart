@RealmModel()
@MapTo('naval_ship')
class _Boat {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late int? maxKnots;
  late int? nauticalMiles;
}
