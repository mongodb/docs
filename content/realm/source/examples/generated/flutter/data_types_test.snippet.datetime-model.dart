@RealmModel()
class _Vehicle {
  @PrimaryKey()
  late ObjectId id;

  late String nickname;
  late DateTime dateLastServiced;
}
