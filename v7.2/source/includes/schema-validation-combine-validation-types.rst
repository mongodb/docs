For example, consider a ``sales`` collection with this schema
validation:

.. code-block:: javascript

   db.createCollection("sales", {
     validator: {
       "$and": [
         // Validation with query operators
         {
           "$expr": {
             "$lt": ["$lineItems.discountedPrice", "$lineItems.price"]
           }
         },
         // Validation with JSON Schema
         {
           "$jsonSchema": {
             "properties": {
               "items": { "bsonType": "array" }
             }
            }
          }
        ]
      }
    }
  )

The preceding validation enforces these rules for documents in the
``sales`` collection:

- ``lineItems.discountedPrice`` must be less than ``lineItems.price``.
  This rule is specified using the :expression:`$lt` operator.

- The ``items`` field must be an array. This rule is specified using
  :query:`$jsonSchema`.
