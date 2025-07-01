.. code-block:: javascript

   const doc1 = { "name": "basketball", "category": "sports", "quantity": 20, "reviews": [] };
   const doc2 = { "name": "football",   "category": "sports", "quantity": 30, "reviews": [] };

   return itemsCollection.insertMany([doc1, doc2])
     .then(result => {
       console.log(`Successfully inserted ${result.insertedIds.length} items!`);
       return result
     })
     .catch(err => console.error(`Failed to insert documents: ${err}`))
