Data Model
~~~~~~~~~~

The examples on this page use a collection named ``store.items`` that
models various items available for purchase in an online store. Each
item has a ``name``, an inventory ``quantity``, and an array of customer
``reviews``.

.. code-block:: json
   :caption: The JSON schema for store.items
   
   {
     "title": "Item",
     "required": ["_id", "name", "quantity", "reviews"],
     "properties": {
       "_id": { "bsonType": "objectId" },
       "name": { "bsonType": "string" },
       "quantity": { "bsonType": "int" },
       "reviews": {
         "bsonType": "array",
         "items": {
           "bsonType": "object",
           "required": ["username", "comment"],
           "properties": {
             "username": { "bsonType": "string" },
             "comment": { "bsonType": "string" }
           }
         }
       }
     }
   }
