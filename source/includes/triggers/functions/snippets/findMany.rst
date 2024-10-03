.. code-block:: javascript

   const query = { "reviews.0": { "$exists": true } };
   const projection = { "_id": 0 };

   return itemsCollection.find(query, projection)
     .sort({ name: 1 })
     .toArray()
     .then(items => {
       console.log(`Successfully found ${items.length} documents.`)
       items.forEach(console.log)
       return items
     })
     .catch(err => console.error(`Failed to find documents: ${err}`))
