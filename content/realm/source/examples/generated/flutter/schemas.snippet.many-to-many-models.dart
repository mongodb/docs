@RealmModel()
class _Scooter {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late _Person? owner;
}

@RealmModel()
class _ScooterShop {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Scooter> scooters;
}
