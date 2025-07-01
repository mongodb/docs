.. code-block:: javascript

   const newItem = {
     "name": "Plastic Bricks",
     "quantity": 10,
     "category": "toys",
     "reviews": [{ "username": "legolover", "comment": "These are awesome!" }]
   };

   itemsCollection.insertOne(newItem)
     .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
     .catch(err => console.error(`Failed to insert item: ${err}`))
