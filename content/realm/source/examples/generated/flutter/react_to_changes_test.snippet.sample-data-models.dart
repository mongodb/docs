@RealmModel()
class _Character {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late String species;
  late int age;
}

@RealmModel()
class _Fellowship {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Character> members;
}
