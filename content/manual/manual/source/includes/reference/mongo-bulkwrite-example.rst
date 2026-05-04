This example uses :method:`Mongo.bulkWrite()` to perform 
the following operations in order:

- inserts a document into the ``db.authors`` collection
- inserts a document into the ``db.books`` collection
- updates the previous document

.. code-block:: javascript
   
   db.getMongo().bulkWrite(
      [
         {
            namespace: 'db.authors',
            name: 'insertOne',
            document: { name: 'Stephen King' }
         },
         {
            namespace: 'db.books',
            name: 'insertOne',
            document: { name: 'It' }
         },
         {
            namespace: 'db.books',
            name: 'updateOne',
            filter: { name: 'It' },
            update: { $set: { year: 1986 } }
         }
      ],
      {
         ordered: true,
         bypassDocumentValidation: true
      }
   )

``mongosh`` performs the bulk write in order and returns the following
document:

.. code-block:: javascript
   
   {
      acknowledged: true,
      insertedCount: 2,
      matchedCount: 1,
      modifiedCount: 1,
      deletedCount: 0,
      upsertedCount: 0,
      insertResults: { '1': { insertedId: ObjectId('67ed8ce8efd926c84cab7945') },
                       '2': { insertedId: ObjectId('67ed8ce8efd926c84cab7946') } }
      updateResults: { '1': { matchedCount: 1, modifiedCount: 1, didUpsert: false } }
   }