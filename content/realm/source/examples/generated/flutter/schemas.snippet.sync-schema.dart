@RealmModel()
class _SyncSchema {
  @PrimaryKey()
  @MapTo("_id")
  late ObjectId id;

  // ... other properties
}

