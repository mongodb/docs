.. code-block:: json
   :linenos:
   :copyable: false

   {
     "$jsonSchema": {
       "bsonType": "object",
       "required": [
         "_id",
         "title",
         "year"
       ],
       "properties": {
         "_id": {
           "bsonType": "objectId"
         },
         "genres": {
           "bsonType": "array",
           "items": {
             "bsonType": "string"
           }
         },
         "plot": {
           "bsonType": "string"
         },
         "title": {
           "bsonType": "string"
         },
         "year": {
           "bsonType": "int"
         }
       }
     }
   }
