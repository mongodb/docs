The following :method:`~db.collection.bulkWrite()` example runs
these operations on the ``pizzas`` collection:

- Adds two documents using ``insertOne``.
- Updates a document using ``updateOne``.
- Deletes a document using ``deleteOne``.
- Replaces a document using ``replaceOne``.

.. code-block:: javascript

   try {
      db.pizzas.bulkWrite( [
         { insertOne: { document: { _id: 3, type: "beef", size: "medium", price: 6 } } },
         { insertOne: { document: { _id: 4, type: "sausage", size: "large", price: 10 } } },
         { updateOne: {
            filter: { type: "cheese" },
            update: { $set: { price: 8 } }
         } },
         { deleteOne: { filter: { type: "pepperoni"} } },
         { replaceOne: {
            filter: { type: "vegan" },
            replacement: { type: "tofu", size: "small", price: 4 }
         } }
      ] )
   } catch( error ) {
      print( error )
   }

Example output, which includes a summary of the completed operations:

.. code-block:: javascript
   :copyable: false

   {
      acknowledged: true,
      insertedCount: 2,
      insertedIds: { '0': 3, '1': 4 },
      matchedCount: 2,
      modifiedCount: 2,
      deletedCount: 1,
      upsertedCount: 0,
      upsertedIds: {}
   }
