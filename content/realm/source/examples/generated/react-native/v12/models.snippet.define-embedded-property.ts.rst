.. code-block:: typescript

   class Manufacturer extends Realm.Object {
     _id!: BSON.ObjectId;
     name!: string;
     cars!: Realm.List<CarWithEmbed>;
     warranties!: Realm.List<Warranty>;

     static schema: Realm.ObjectSchema = {
       name: 'Manufacturer',
       properties: {
         _id: 'objectId',
         name: 'string',
         cars: 'CarWithEmbed[]',
         // Embed an array of objects
         warranties: 'Warranty[]',
       },
     };
   }

   class CarWithEmbed extends Realm.Object {
     _id!: BSON.ObjectId;
     model!: string;
     miles?: number;
     warranty?: Warranty;

     static schema: Realm.ObjectSchema = {
       name: 'CarWithEmbed',
       properties: {
         _id: 'objectId',
         model: 'string',
         miles: 'int?',
         // Embed one object
         warranty: 'Warranty?',
       },
     };
   }

   class Warranty extends Realm.Object {
     name!: string;
     termLength!: number;
     cost!: number;

     static schema: Realm.ObjectSchema = {
       name: 'Warranty',
       embedded: true,
       properties: {
         name: 'string',
         termLength: 'int',
         cost: 'int',
       },
     };
   }
