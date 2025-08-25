.. code-block:: typescript

   import React from 'react';
   import {View, Text} from 'react-native';
   import {GeoBox, GeoPoint} from 'realm';
   import {useQuery} from '@realm/react';

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
