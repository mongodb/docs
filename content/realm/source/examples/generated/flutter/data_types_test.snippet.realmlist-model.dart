@RealmModel()
class _Player {
  @PrimaryKey()
  late ObjectId id;

  late String username;
  // `inventory` property of type RealmList<Item>
  // where Items are other RealmObjects
  late List<_Item> inventory;
  // `traits` property of type RealmList<String>
  // where traits are Dart Strings.
  late List<String> traits;
}

@RealmModel()
class _Item {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late String description;
}
