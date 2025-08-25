.. code-block:: typescript

   export class QuickstartTask extends Realm.Object<Task> {
     _id!: BSON.ObjectID;
     name!: string;
     status?: string;
     owner_id?: string;

     static schema: ObjectSchema = {
       name: "Task",
       properties: {
         _id: "objectId",
         name: "string",
         status: "string?",
         owner_id: "string?",
       },
       primaryKey: "_id",
     };
   }
