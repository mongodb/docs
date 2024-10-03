.. code-block:: javascript
   :emphasize-lines: 9

   // Find the first document that has a quantity greater than 25
   const query = { "quantity": { "$gte": 25 } };
   // Sort the documents in order of descending quantity before
   // deleting the first one.
   const options = {
     "sort": { "quantity": -1 }
   }

   return itemsCollection.findOneAndDelete(query, options)
     .then(deletedDocument => {
       if(deletedDocument) {
         console.log(`Successfully deleted document that had the form: ${deletedDocument}.`)
       } else {
         console.log("No document matches the provided query.")
       }
       return deletedDocument
     })
     .catch(err => console.error(`Failed to find and delete document: ${err}`))
