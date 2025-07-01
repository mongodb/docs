.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      Run the following code to create
      a :ref:`vector search index <avs-types-vector-search>` that indexes the 
      ``plot_embedding`` field in the collection.
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

        # Use helper method to create the vector search index
        vector_store.create_vector_search_index( 
           dimensions = 1536 # The dimensions of the vector embeddings to be indexed
        )

      .. tip::

         `create_vector_search_index API Reference <https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/index/langchain_mongodb.index.create_vector_search_index.html>`__

   .. step:: Create the {+fts+} index.

      Run the following code in your notebook to create a 
      :ref:`search index <fts-about-indexing>`
      that indexes the ``plot`` field in the collection.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

         from langchain_mongodb.index import create_fulltext_search_index
         from pymongo import MongoClient

         # Connect to your cluster
         client = MongoClient(ATLAS_CONNECTION_STRING)

         # Use helper method to create the search index
         create_fulltext_search_index( 
            collection = client["sample_mflix"]["embedded_movies"],
            field = "plot",
            index_name = "search_index"
         )

      .. tip::

         `create_fulltext_search_index API Reference <https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/index/langchain_mongodb.index.create_fulltext_search_index.html>`__
