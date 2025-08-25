.. code-block:: typescript

   export class ClassWithCounter extends Realm.Object<ClassWithCounter> {
     _id!: BSON.ObjectId;
     myCounter!: Counter;
     nullableCounter?: Counter | null;

     static schema: ObjectSchema = {
       name: "ClassWithCounter",
       primaryKey: "_id",
       properties: {
         _id: { type: "objectId", default: () => new BSON.ObjectId() },
         myCounter: { type: "int", presentation: "counter" },
         // or myCounter: "counter"
         nullableCounter: { type: "int", presentation: "counter", optional: true },
         // or nullableCounter: "counter?"
       },
     };
   }
