Embedded objects map to embedded documents in the parent type's :ref:`schema
<schemas>`.
This behavior differs from regular Realm objects, which map to their own MongoDB collection.

.. code-block:: json
   :emphasize-lines: 14-23

   {
     "title": "Person",
     "bsonType": "object",
     "required": ["id"],
     "properties": {
       "id": { "bsonType": "int" },
       "name": { "bsonType": "string" },
       "dogs": {
         "bsonType": "array",
         "items": {
           "bsonType": "objectId"
         }
       },
       "address": {
         "title": "Address",
         "bsonType": "object",
         "properties": {
           "street": { "bsonType": "string" },
           "city": { "bsonType": "string" },
           "country": { "bsonType": "string" },
           "postalCode": { "bsonType": "string" }
         }
       }
     }
   }

.. code-block:: json
   :emphasize-lines: 4-26

   {
     "title": "DogClub",
     "bsonType": "object",
     "required": ["_id", "name", "addresses"],
     "properties": {
       "_id": "objectId",
       "name": { "bsonType": "string" },
       "members": {
         "bsonType": "array",
         "items": {
           "bsonType": "objectId"
         }
       },
       "addresses": {
         "bsonType": "array",
         "items": {
           "title": "Address",
           "bsonType": "object",
           "properties": {
             "street": { "bsonType": "string" },
             "city": { "bsonType": "string" },
             "country": { "bsonType": "string" },
             "postalCode": { "bsonType": "string" }
           }
         }
       }
     }
   }
