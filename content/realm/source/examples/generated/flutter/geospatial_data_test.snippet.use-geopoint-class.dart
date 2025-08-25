// Use the GeoJSON-compatible class as a property in your model.
@RealmModel()
class _Company {
  @PrimaryKey()
  late ObjectId id;
  _MyGeoPoint? location;
}
