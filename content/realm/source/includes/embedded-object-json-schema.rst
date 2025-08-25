Embedded objects map to embedded documents in the parent type's :ref:`schema
<schemas>`.
This behavior differs from regular Realm objects, which map to their own MongoDB collection.

.. code-block:: json
   :emphasize-lines: 8-17

   {
     "title": "Contact",
     "bsonType": "object",
     "required": ["_id"],
     "properties": {
       "_id": { "bsonType": "objectId" },
       "name": { "bsonType": "string" },
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
   :emphasize-lines: 8-20

   {
     "title": "Business",
     "bsonType": "object",
     "required": ["_id", "name"],
     "properties": {
       "_id": { "bsonType": "objectId" },
       "name": { "bsonType": "string" },
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
