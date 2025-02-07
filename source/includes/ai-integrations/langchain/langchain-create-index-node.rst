Add the following code to the asynchronous function that you defined in your ``get-started.js`` file.
This code creates an index of the :ref:`vectorSearch <avs-types-vector-search>` type that indexes the following fields:

- ``embedding`` field as the :ref:`vector <avs-types-vector-search>` type. The ``embedding`` field
  contains the embeddings created using OpenAI's ``text-embedding-ada-002`` embedding model. The index
  definition specifies ``1536`` vector dimensions and measures similarity using ``cosine``.
- ``loc.pageNumber`` field as the :ref:`filter <avs-types-vector-search>` type for pre-filtering data
  by the page number in the PDF.

This code also uses an await function to ensure that your search index has :ref:`synced <troubleshoot-initial-sync>` to your data before it's used.

.. code-block:: javascript
   :copyable: true 
   :linenos: 

   // Ensure index does not already exist, then create your Atlas Vector Search index
   const indexes = await collection.listSearchIndexes("vector_index").toArray();
   if(indexes.length === 0){

      // Define your Atlas Vector Search Index
      const index = {
         name: "vector_index",
         type: "vectorSearch",
         definition: {
            "fields": [
               {
                  "type": "vector",
                  "numDimensions": 1536,
                  "path": "embedding",
                  "similarity": "cosine"
               },
               {
                  "type": "filter",
                  "path": "loc.pageNumber"
               }
            ]
         }
      }

      // Run the helper method
      const result = await collection.createSearchIndex(index);
      console.log(result);

      // Wait for Atlas to sync index
      console.log("Waiting for initial sync...");
      await new Promise(resolve => setTimeout(() => {
         resolve();
      }, 10000));
   }