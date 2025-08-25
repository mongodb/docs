import Realm, {
  ObjectSchema,
  GeoBox,
  GeoCircle,
  GeoPoint,
  GeoPolygon,
  CanonicalGeoPoint,
  GeoPosition,
  kmToRadians,
} from "realm";

describe("Geospatial", () => {
  test("should define an object model, open a realm, and perform geospatial queries", async () => {
    // :snippet-start: define-geopoint-class
    // Implement `CanonicalGeoPoint`
    // for convenience when persisting geodata.
    class MyGeoPoint implements CanonicalGeoPoint {
      coordinates!: GeoPosition;
      type = "Point" as const;

      constructor(long: number, lat: number) {
        this.coordinates = [long, lat];
      }

      static schema: ObjectSchema = {
        name: "MyGeoPoint",
        embedded: true,
        properties: {
          type: "string",
          coordinates: "double[]",
        },
      };
    }
    // :snippet-end:

    // :snippet-start: use-geopoint-class
    class Company extends Realm.Object<Company> {
      _id!: number;
      location!: MyGeoPoint;

      static schema: ObjectSchema = {
        name: "Company",
        properties: {
          _id: "int",
          location: "MyGeoPoint",
        },
        primaryKey: "_id",
      };
    }
    // :snippet-end:

    // :snippet-start: write-geospatial-object
    const realm = await Realm.open({
      // `MyGeoPoint` does not extend `Realm.Object`, so you pass
      // only the `.schema` when opening the realm.
      schema: [Company, MyGeoPoint.schema],
    });
    expect(realm.isClosed).toBe(false); // :remove:

    // Add geospatial object to realm.
    realm.write(() => {
      realm.create(Company, {
        _id: 6,
        location: new MyGeoPoint(-122.35, 47.68),
      });
      realm.create(Company, {
        _id: 9,
        location: new MyGeoPoint(-121.85, 47.9),
      });
    });
    // :snippet-end:

    // :snippet-start: geocircle
    const smallCircle: GeoCircle = {
      center: [-121.9, 47.3],
      // The GeoCircle radius is measured in radians.
      // This radian distance corresponds with 0.25 degrees.
      distance: 0.004363323,
    };

    const largeCircleCenter: GeoPoint = {
      longitude: -122.6,
      latitude: 47.8,
    };

    // Realm provides `kmToRadians` and `miToRadians`
    // to convert these measurements. Import the relevant
    // convenience method for your app's needs.
    const radiusFromKm = kmToRadians(44.4);

    const largeCircle: GeoCircle = {
      center: largeCircleCenter,
      distance: radiusFromKm,
    };
    // :snippet-end:

    // :snippet-start: geobox
    const largeBox: GeoBox = {
      bottomLeft: [-122.7, 47.3],
      topRight: [-122.1, 48.1],
    };

    const smallBoxBottomLeft: GeoPoint = {
      longitude: -122.4,
      latitude: 47.5,
    };
    const smallBoxTopRight: GeoPoint = {
      longitude: -121.8,
      latitude: 47.9,
    };
    const smallBox: GeoBox = {
      bottomLeft: smallBoxBottomLeft,
      topRight: smallBoxTopRight,
    };
    // :snippet-end:

    // :snippet-start: geopolygon
    // Create a basic polygon
    const basicPolygon: GeoPolygon = {
      outerRing: [
        [-122.8, 48.0],
        [-121.8, 48.2],
        [-121.6, 47.6],
        [-122.0, 47.0],
        [-122.6, 47.2],
        [-122.8, 48.0],
      ],
    };

    // Create a polygon with one hole
    const outerRing: GeoPoint[] = [
      [-122.8, 48.0],
      [-121.8, 48.2],
      [-121.6, 47.6],
      [-122.0, 47.0],
      [-122.6, 47.2],
      [-122.8, 48.0],
    ];

    const hole: GeoPoint[] = [
      [-122.6, 47.8],
      [-122.2, 47.7],
      [-122.6, 47.4],
      [-122.5, 47.6],
      [-122.6, 47.8],
    ];

    const polygonWithOneHole: GeoPolygon = {
      outerRing: outerRing,
      holes: [hole],
    };

    // Add a second hole to the polygon
    const hole2: GeoPoint[] = [
      {
        longitude: -122.05,
        latitude: 47.55,
      },
      {
        longitude: -121.9,
        latitude: 47.55,
      },
      {
        longitude: -122.1,
        latitude: 47.3,
      },
      {
        longitude: -122.05,
        latitude: 47.55,
      },
    ];

    const polygonWithTwoHoles: GeoPolygon = {
      outerRing: outerRing,
      holes: [hole, hole2],
    };
    // :snippet-end:

    // :snippet-start: geocircle-query
    const companiesInSmallCircle = realm
      .objects(Company)
      .filtered("location geoWithin $0", smallCircle);
    console.debug(`Companies in smallCircle: ${companiesInSmallCircle.length}`);

    const companiesInLargeCircle = realm
      .objects(Company)
      .filtered("location geoWithin $0", largeCircle);
    console.debug(`Companies in largeCircle: ${companiesInLargeCircle.length}`);
    // :snippet-end:
    // :snippet-start: geobox-query
    const companiesInLargeBox = realm
      .objects(Company)
      .filtered("location geoWithin $0", largeBox);
    console.debug(`Companies in large box: ${companiesInLargeBox.length}`);

    const companiesInSmallBox = realm
      .objects(Company)
      .filtered("location geoWithin $0", smallBox);
    console.debug(`Companies in small box: ${companiesInSmallBox.length}`);
    // :snippet-end:
    // :snippet-start: geopolygon-query
    const companiesInBasicPolygon = realm
      .objects(Company)
      .filtered("location geoWithin $0", basicPolygon);
    console.debug(
      `Companies in basic polygon: ${companiesInBasicPolygon.length}`
    );

    const companiesInPolygonWithTwoHoles = realm
      .objects(Company)
      .filtered("location geoWithin $0", polygonWithTwoHoles);
    console.debug(
      `Companies in polygon with two holes: ${companiesInPolygonWithTwoHoles.length}`
    );
    // :snippet-end:

    expect(companiesInSmallCircle.length).toBe(0);
    expect(companiesInLargeCircle.length).toBe(1);
    expect(companiesInLargeBox.length).toBe(1);
    expect(companiesInSmallBox.length).toBe(2);
    expect(companiesInBasicPolygon.length).toBe(2);
    expect(companiesInPolygonWithTwoHoles.length).toBe(1);
    expect.hasAssertions();
  });
});
