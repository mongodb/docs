.. procedure:: 
   :style: normal 

   .. step:: Run the following code to connect to your Atlas cluster. 
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

      .. code-block:: python
         :copyable: true

         client = MongoClient(os.environ.get("MONGO_CONNECTION_STRING"))

   .. step:: Create the ``haystack_db.test`` collection. 

      Run the following code to create your ``haystack_db`` database and ``test`` collection.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

      .. code-block:: python
         :copyable: true

         # Create your database and collection
         db_name = "haystack_db"
         collection_name = "test"
         database = client[db_name]
         database.create_collection(collection_name)

         # Define collection
         collection = client[db_name][collection_name]
   
   .. step:: Define the Atlas Vector Search index.

      Run the following code to create an index of the :ref:`vectorSearch
      <avs-types-vector-search>` type. The ``embedding`` field
      contains the embeddings that you'll create using OpenAI's
      ``text-embedding-ada-002`` embedding model. The index
      definition specifies ``1536`` vector dimensions and
      measures similarity using ``cosine``.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

      .. code-block:: python
         :copyable: true 

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

      .. include:: /includes/fact-index-build-initial-sync.rst
