class _Vehicle {
  @PrimaryKey()
  late ObjectId id;

  late String? maybeDescription; // optional value

  late double milesTravelled = 0; // 0 is default value

  @Ignored()
  late String notInRealmModel;

  @Indexed()
  late String make;

  @MapTo('wheels') // 'wheels' is property name in the RealmObject
  late int numberOfWheels;
}

