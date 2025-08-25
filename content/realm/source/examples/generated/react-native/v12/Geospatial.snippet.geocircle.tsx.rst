.. code-block:: typescript

   import React from 'react';
   import {View, Text} from 'react-native';
   import {GeoCircle, GeoPoint, kmToRadians} from 'realm';
   import {useQuery} from '@realm/react';

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
