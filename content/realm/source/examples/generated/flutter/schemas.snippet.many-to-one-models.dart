@RealmModel()
class _Bike {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String firstName;
  late String lastName;
  late int? age;
}

