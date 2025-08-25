import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import 'utils.dart';

part 'geospatial_data_test.realm.dart';

// :snippet-start: define-geopoint-class
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
// :snippet-end:

// :snippet-start: use-geopoint-class
// Use the GeoJSON-compatible class as a property in your model.
@RealmModel()
class _Company {
  @PrimaryKey()
  late ObjectId id;
  _MyGeoPoint? location;
}
// :snippet-end:

main() {
  test("Create and query geospatial data", () async {
    final firstCompanyID = ObjectId();
    final secondCompanyID = ObjectId();

    // :snippet-start: write-geospatial-object
    final realm =
        Realm(Configuration.local([MyGeoPoint.schema, Company.schema]));

    realm.write(() {
      realm.addAll([
        Company(
          firstCompanyID,
          location: MyGeoPoint(coordinates: [-122.35, 47.68]),
        ),
        Company(
          secondCompanyID,
          location: MyGeoPoint(coordinates: [-121.85, 47.9]),
        )
      ]);
    });
    // :snippet-end:

    // :snippet-start: geocircle
    final smallCircle =
        GeoCircle(GeoPoint(lon: -121.9, lat: 47.3), 0.25.degrees);

    final largeCircleCenter = GeoPoint(lon: -122.6, lat: 47.8);

    // The SDK provides convenience methods to convert measurements to radians.
    final radiusFromKm = GeoDistance.fromKilometers(44.4);

    final largeCircle = GeoCircle(largeCircleCenter, radiusFromKm);
    // :snippet-end:

    // :snippet-start: geocircle-query
    final companiesInSmallCircle =
        realm.query<Company>("location geoWithin \$0", [smallCircle]);

    final companiesInLargeCircle =
        realm.query<Company>("location geoWithin \$0", [largeCircle]);
    // :snippet-end:

    // :snippet-start: geobox
    final largeBox = GeoBox(
        GeoPoint(lon: -122.7, lat: 47.3), GeoPoint(lon: -122.1, lat: 48.1));

    final smallBoxSouthWest = GeoPoint(lon: -122.4, lat: 47.5);
    final smallBoxNorthEast = GeoPoint(lon: -121.8, lat: 47.9);
    final smallBox = GeoBox(smallBoxSouthWest, smallBoxNorthEast);
    // :snippet-end:

    // :snippet-start: geobox-query
    final companiesInLargeBox =
        realm.query<Company>("location geoWithin \$0", [largeBox]);
    final companiesInSmallBox =
        realm.query<Company>("location geoWithin \$0", [smallBox]);
    // :snippet-end:

    // TODO: Add geopolygon examples and query when the SDK exposes it
    // Similar to https://github.com/mongodb/docs-realm/blob/df7c0d33231aac3a78673bd456b59f128a038316/examples/node/v12/__tests__/geospatial.test.js#L102

    expect(
        realm.query<Company>("id == \$0", [firstCompanyID]).first, isNotNull);
    expect(
        realm
            .query<Company>("id == \$0", [firstCompanyID])
            .first
            .location!
            .coordinates,
        equals([-122.35, 47.68]));
    expect(
        realm.query<Company>("id == \$0", [secondCompanyID]).first, isNotNull);
    expect(
        realm
            .query<Company>("id == \$0", [secondCompanyID])
            .first
            .location!
            .coordinates,
        equals([-121.85, 47.9]));
    expect(companiesInSmallCircle.length, equals(0));
    expect(companiesInLargeCircle.length, equals(1));
    expect(companiesInLargeBox.length, equals(1));
    expect(companiesInSmallBox.length, equals(2));
    await cleanUpRealm(realm);
  });
}
