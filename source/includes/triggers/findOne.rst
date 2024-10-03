.. code-block:: javascript

   const query = { "quantity": { "$gte": 25 } };
   const projection = {
    "title": 1,
    "quantity": 1,
   }

   return itemsCollection.findOne(query, projection)
     .then(result => {
       if(result) {
         console.log(`Successfully found document: ${result}.`);
       } else {
         console.log("No document matches the provided query.");
       }
       return result;
     })
     .catch(err => console.error(`Failed to find document: ${err}`));
