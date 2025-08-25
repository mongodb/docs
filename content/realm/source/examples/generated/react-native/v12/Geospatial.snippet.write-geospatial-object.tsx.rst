.. code-block:: typescript

   import React from 'react';
   import {View} from 'react-native';
   import {useEffect} from 'react';
   import {useRealm, useQuery} from '@realm/react';

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
