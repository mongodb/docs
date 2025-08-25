.. code-block:: javascript

   export class QuickstartTask extends Realm.Object {
     static schema = {
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
