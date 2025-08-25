.. code-block:: typescript

   class ToManyManufacturer extends Realm.Object {
     _id!: BSON.ObjectId;
     name!: string;
     cars!: Realm.List<LinkedCar>;

     static schema: Realm.ObjectSchema = {
       name: 'ToManyManufacturer',
       properties: {
         _id: 'objectId',
         name: 'string',
         // A manufacturer's related LinkedCar objects
         cars: 'LinkedCar[]',
       },
     };
   }

   class LinkedCar extends Realm.Object {
     _id!: BSON.ObjectId;
     model!: string;
     miles?: number;

     static schema: Realm.ObjectSchema = {
       name: 'LinkedCar',
       properties: {
         _id: 'objectId',
         model: 'string',
         miles: 'int?',
         // A car's related ToManyManufacturer objects
         manufacturer: {
           type: 'linkingObjects',
           objectType: 'ToManyManufacturer',
           property: 'cars',
         },
       },
     };
   }
