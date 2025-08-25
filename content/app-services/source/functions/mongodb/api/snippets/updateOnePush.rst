.. code-block:: javascript

   const query = { "name": "football" };
   const update = {
     "$push": {
       "reviews": {
         "username": "tombradyfan",
         "comment": "I love football!!!"
       }
     }
   };
   const options = { "upsert": false };

   itemsCollection.updateOne(query, update, options)
     .then(result => {
       const { matchedCount, modifiedCount } = result;
       if(matchedCount && modifiedCount) {
         console.log(`Successfully added a new review.`)
       }
     })
     .catch(err => console.error(`Failed to add review: ${err}`))
