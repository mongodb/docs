.. code-block:: typescript

   import React from 'react';
   import {View, Text} from 'react-native';
   import {GeoPolygon, GeoPoint} from 'realm';
   import {useQuery} from '@realm/react';

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
