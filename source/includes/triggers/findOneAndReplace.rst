.. code-block:: javascript
   :emphasize-lines: 12

   // Find the document that describes "lego"
   const query = { "name": "lego" };
   // Replace it with a new document
   const replacement = {
       "name": "blocks",
       "price": 20.99,
       "category": "toys"
   };
   // Return the original document as it was before being replaced
   const options = { "returnNewDocument": false };

   return itemsCollection.findOneAndReplace(query, replacement, options)
     .then(replacedDocument => {
       if(replacedDocument) {
         console.log(`Successfully replaced the following document: ${replacedDocument}.`)
       } else {
         console.log("No document matches the provided query.")
       }
       return updatedDocument
     })
     .catch(err => console.error(`Failed to find and replace document: ${err}`))
