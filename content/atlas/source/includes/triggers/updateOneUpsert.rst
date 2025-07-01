.. code-block:: javascript
   :emphasize-lines: 3

   const query = { "name": "board games" };
   const update = { "$inc": { "quantity": 5 } };
   const options = { "upsert": true };

   itemsCollection.updateOne(query, update, options)
     .then(result => {
       const { matchedCount, modifiedCount, upsertedId } = result;
       if(upsertedId) {
         console.log(`Document not found. Inserted a new document with _id: ${upsertedId}`)
       } else {
         console.log(`Successfully increased ${query.name} quantity by ${update.$inc.quantity}`)
       }
     })
     .catch(err => console.error(`Failed to upsert document: ${err}`))
