// To store geospatial data, create an embedded object with this structure.
// Name it whatever is most convenient for your application.
@RealmModel(ObjectType.embeddedObject)
class _MyGeoPoint {
  // These two properties are required to persist geo data.
  final String type = 'Point';
  final List<double> coordinates = const [];

  // You can optionally implement convenience methods to simplify
  // creating and working with geospatial data.
  double get lon => coordinates[0];
  set lon(double value) => coordinates[0] = value;

  double get lat => coordinates[1];
  set lat(double value) => coordinates[1] = value;

  GeoPoint toGeoPoint() => GeoPoint(lon: lon, lat: lat);
}
