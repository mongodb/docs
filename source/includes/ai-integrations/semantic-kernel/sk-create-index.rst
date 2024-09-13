In your notebook, run the following code to connect to your |service| {+cluster+} 
and create an index of the :ref:`vectorSearch <avs-types-vector-search>` type. 
This index definition specifies indexing the following fields:
         
- ``embedding`` field as the :ref:`vector <avs-types-vector-search>` type. The ``embedding`` field
  contains the embeddings created using OpenAI's ``text-embedding-ada-002`` embedding model. The index
  definition specifies ``1536`` vector dimensions and measures similarity using ``cosine``.
           
.. code-block:: python
   :copyable: true 

   # Connect to your Atlas cluster and specify the collection
   client = MongoClient(ATLAS_CONNECTION_STRING)
   collection = client["semantic_kernel_db"]["test"]

   # Create your index model, then create the search index
   search_index_model = SearchIndexModel(
      definition={
         "fields": [
            {
            "type": "vector",
            "path": "embedding",
            "numDimensions": 1536,
            "similarity": "cosine"
            }
         ]
      },
      name="vector_index",
      type="vectorSearch"
   )

   collection.create_search_index(model=search_index_model)

The index should take about one minute to build. While it builds, the index is in an :ref:`initial sync <troubleshoot-initial-sync>`
state. When it finishes building, you can start querying the data in your collection.
