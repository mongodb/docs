.. code-block:: javascript
   :emphasize-lines: 14

   // Find the document that describes "lego"
   const query = { "name": "lego" };
   // Set some fields in that document
   const update = {
     "$set": {
       "name": "blocks",
       "price": 20.99,
       "category": "toys"
     }
   };
   // Return the updated document instead of the original document
   const options = { returnNewDocument: true };

   return itemsCollection.findOneAndUpdate(query, update, options)
     .then(updatedDocument => {
       if(updatedDocument) {
         console.log(`Successfully updated document: ${updatedDocument}.`)
       } else {
         console.log("No document matches the provided query.")
       }
       return updatedDocument
     })
     .catch(err => console.error(`Failed to find and update document: ${err}`))
