@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<String> hobbies;
}

@RealmModel()
class _Team {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Person> crew;
  late RealmValue eventLog;
}
