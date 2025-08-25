// :snippet-start: open-realm-geospatial
import React from 'react';
import Realm, {ObjectSchema, CanonicalGeoPoint, GeoPosition} from 'realm';
import {RealmProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import {View, Text} from 'react-native';
import {GeoBox, GeoCircle, GeoPoint, GeoPolygon, kmToRadians} from 'realm';
import {useQuery, useRealm} from '@realm/react';
// :remove-end:

// Implement `CanonicalGeoPoint`
// for convenience when persisting geodata.
class MyGeoPoint implements CanonicalGeoPoint {
  coordinates!: GeoPosition;
  type = 'Point' as const;

  constructor(long: number, lat: number) {
    this.coordinates = [long, lat];
  }

  static schema: ObjectSchema = {
    name: 'MyGeoPoint',
    embedded: true,
    properties: {
      type: 'string',
      coordinates: 'double[]',
    },
  };
}

class Company extends Realm.Object<Company> {
  _id!: number;
  location!: MyGeoPoint;

  static schema: ObjectSchema = {
    name: 'Company',
    properties: {
      _id: 'int',
      location: 'MyGeoPoint',
    },
    primaryKey: '_id',
  };
}

export const Geospatial = () => {
  return (
    <View>
      {/* 
          `MyGeoPoint` does not extend `Realm.Object`, so you pass
          only the `.schema` when opening the realm. 
      */}
      <RealmProvider schema={[Company, MyGeoPoint.schema]}>
        <WriteGeospatialObjects />
      </RealmProvider>
    </View>
  );
};
// :snippet-end:

// :snippet-start: write-geospatial-object
// :uncomment-start:
// import React from 'react';
// import {View} from 'react-native';
// import {useEffect} from 'react';
// import {useRealm, useQuery} from '@realm/react';
// :uncomment-end:

function WriteGeospatialObjects(): JSX.Element {
  const realm = useRealm();
  const companies = useQuery(Company);

  useEffect(() => {
    if (!companies.length) {
      // Add geospatial objects to realm.
      writeNewCompany({_id: 6, location: new MyGeoPoint(-122.35, 47.68)});
      writeNewCompany({_id: 9, location: new MyGeoPoint(-121.85, 47.9)});
    }
  }, []);

  type CompanyProps = {
    _id: number;
    location: MyGeoPoint;
  };

  const writeNewCompany = ({_id, location}: CompanyProps) => {
    // Add geospatial object to realm.
    realm.write(() => {
      realm.create(Company, {
        _id,
        location,
      });
    });
  };

  return (
    <View>
      <Geocircle />
      <Geobox />
      <Geopolygon />
    </View>
  );
}
// :snippet-end:

// :snippet-start: geocircle
// :uncomment-start:
// import React from 'react';
// import {View, Text} from 'react-native';
// import {GeoCircle, GeoPoint, kmToRadians} from 'realm';
// import {useQuery} from '@realm/react';
// :uncomment-end:

function Geocircle(): JSX.Element {
  // Define a GeoCircle
  const smallCircle: GeoCircle = {
    center: [-121.9, 47.3],
    // The GeoCircle radius is measured in radians.
    // This radian distance corresponds with 0.25 degrees.
    distance: 0.004363323,
  };

  // Realm provides `kmToRadians` and `miToRadians`
  // to convert these measurements. Import the relevant
  // convenience method for your app's needs.
  const radiusFromKm = kmToRadians(44.4);

  // Define a GeoPoint within a GeoCircle
  const largeCircleCenter: GeoPoint = {
    longitude: -122.6,
    latitude: 47.8,
  };

  const largeCircle: GeoCircle = {
    center: largeCircleCenter,
    distance: radiusFromKm,
  };

  // Query geospatial data
  const companiesInSmallCircle = useQuery(
    Company,
    collection => collection.filtered('location geoWithin $0', smallCircle),
    [smallCircle],
  );

  // Query geospatial data
  const companiesInLargeCircle = useQuery(
    Company,
    collection => collection.filtered('location geoWithin $0', largeCircle),
    [largeCircle],
  );

  return (
    <View>
      <Text>Small circle: {companiesInSmallCircle.length}</Text>
      <Text>Large circle: {companiesInLargeCircle.length}</Text>
    </View>
  );
}
// :snippet-end:

// :snippet-start: geobox
// :uncomment-start:
// import React from 'react';
// import {View, Text} from 'react-native';
// import {GeoBox, GeoPoint} from 'realm';
// import {useQuery} from '@realm/react';
// :uncomment-end:

function Geobox(): JSX.Element {
  // Define a GeoBox
  const largeBox: GeoBox = {
    bottomLeft: [-122.7, 47.3],
    topRight: [-122.1, 48.1],
  };

  // Define GeoBox corners
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

  // Query geospatial data
  const companiesInLargeBox = useQuery(
    Company,
    collection => collection.filtered('location geoWithin $0', largeBox),
    [largeBox],
  );

  // Query geospatial data
  const companiesInSmallBox = useQuery(
    Company,
    collection => collection.filtered('location geoWithin $0', smallBox),
    [smallBox],
  );

  return (
    <View>
      <Text>Small box: {companiesInSmallBox.length}</Text>
      <Text>Large box: {companiesInLargeBox.length}</Text>
    </View>
  );
}
// :snippet-end:

// :snippet-start: geopolygon
// :uncomment-start:
// import React from 'react';
// import {View, Text} from 'react-native';
// import {GeoPolygon, GeoPoint} from 'realm';
// import {useQuery} from '@realm/react';
// :uncomment-end:

function Geopolygon(): JSX.Element {
  // Define a basic GeoPolygon
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

  // Define a GeoPolygon with one hole
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

  // Add a second hole to the GeoPolygon
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

  // Query geospatial data
  const companiesInBasicPolygon = useQuery(
    Company,
    collection => collection.filtered('location geoWithin $0', basicPolygon),
    [basicPolygon],
  );

  // Query geospatial data
  const companiesInPolygonWithTwoHoles = useQuery(
    Company,
    collection =>
      collection.filtered('location geoWithin $0', polygonWithTwoHoles),
    [polygonWithTwoHoles],
  );

  return (
    <View>
      <Text>Basic polygon: {companiesInBasicPolygon.length}</Text>
      <Text>
        Polygon with two holes: {companiesInPolygonWithTwoHoles.length}
      </Text>
    </View>
  );
}
// :snippet-end:
