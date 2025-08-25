.. code-block:: javascript

   const query = { "name": "lego" };
   const update = {
     "$set": {
       "name": "blocks",
       "price": 20.99,
       "category": "toys"
     }
   };
   const options = { "upsert": false };

   itemsCollection.updateOne(query, update, options)
     .then(result => {
       const { matchedCount, modifiedCount } = result;
       if(matchedCount && modifiedCount) {
         console.log(`Successfully updated the item.`)
       }
     })
     .catch(err => console.error(`Failed to update the item: ${err}`))
