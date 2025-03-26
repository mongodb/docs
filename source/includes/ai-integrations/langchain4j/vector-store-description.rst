This code performs the following actions:

- Creates a ``MongoClient`` instance that is connected to your Atlas
  deployment.

- Sets the number of dimensions in the vector search index definition
  to the embedding dimension of the AI model. The resulting vector search
  index has the following definition:

  .. code-block:: json
     
     {
       "fields": [
         {
           "type": "vector",
           "path": "embedding",
           "numDimensions": 1024,
           "similarity": "cosine"
         }
       ]
     }

- Configures your |service| collection by specifying 
  the following parameters:

  - ``langchain4j_test.vector_store`` as the |service| collection to store the documents.
  - ``vector_index`` as the index to use for querying the embedding store.

Because the ``createIndex`` boolean is set to ``true``, instantiating
the embedding store automatically creates the vector search index. The code
includes a delay to allow for successful index creation.

Add the following code into your ``Main.java`` file:
