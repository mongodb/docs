.. code-block:: javascript

   return itemsCollection.count({ "reviews.0": { "$exists": true } })
     .then(numDocs => console.log(`${numDocs} items have a review.`))
     .catch(err => console.error("Failed to count documents: ", err))
