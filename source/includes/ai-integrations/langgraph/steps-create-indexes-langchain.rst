.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      Run the following code to create
      a :ref:`vector search index <avs-types-vector-search>` that indexes the 
      ``plot_embedding`` field in the collection.

      .. code-block:: python

        # Use helper method to create the vector search index
        vector_store.create_vector_search_index( 
           dimensions = 1536
        )

      .. tip::

         `create_vector_search_index API Reference <https://python.langchain.com/api_reference/mongodb/vectorstores/langchain_mongodb.vectorstores.MongoDBAtlasVectorSearch.html#langchain_mongodb.vectorstores.MongoDBAtlasVectorSearch.create_vector_search_index>`__

   .. step:: Create the {+fts+} index.

      Run the following code in your notebook to create a 
      :ref:`search index <fts-about-indexing>`
      that indexes the ``title`` field in the collection.

      .. code-block:: python

         from langchain_mongodb.index import create_fulltext_search_index
         from pymongo import MongoClient

         # Connect to your cluster
         client = MongoClient(ATLAS_CONNECTION_STRING)

         # Use helper method to create the search index
         create_fulltext_search_index( 
            collection = client["sample_mflix"]["embedded_movies"],
            field = "title",
            index_name = "search_index"
         )

      .. tip::

         `create_fulltext_search_index API Reference <https://api.python.langchain.com/en/latest/index/langchain_mongodb.index.create_fulltext_search_index.html#langchain_mongodb.index.create_fulltext_search_index>`__
