.. code-block:: typescript

   import React from 'react';
   import Realm, {ObjectSchema, CanonicalGeoPoint, GeoPosition} from 'realm';
   import {RealmProvider} from '@realm/react';

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
