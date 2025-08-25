// Define class with a `RealmValue` property
@RealmModel()
class _EventLog {
  @PrimaryKey()
  late ObjectId id;

  late String eventType;
  late DateTime timestamp;
  late String userId;
  late RealmValue details;
}
