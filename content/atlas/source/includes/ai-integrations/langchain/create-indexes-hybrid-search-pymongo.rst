.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      Run the following code to create
      a :ref:`vector search index <avs-types-vector-search>` that indexes the 
      ``plot_embedding_voyage_3_large`` field in the collection.

      .. code-block:: python

         from pymongo import MongoClient
         from pymongo.operations import SearchIndexModel

         # Connect to your cluster
         client = MongoClient(MONGODB_URI)
         collection = client["sample_mflix"]["embedded_movies"]
        
         # Create your vector search index model, then create the index
         vector_index_model = SearchIndexModel(
            definition={
               "fields": [
                  {
                  "type": "vector",
                  "path": "plot_embedding_voyage_3_large",
                  "numDimensions": 2048,
                  "similarity": "dotProduct"
                  }
               ]
            },
            name="vector_index",
            type="vectorSearch"
         )
         collection.create_search_index(model=vector_index_model)
               
   .. step:: Create the {+fts+} index.

      Run the following code to create a 
      :ref:`search index <fts-manage-indexes>`
      that indexes the ``plot`` field in the collection.

      .. code-block:: python
         :copyable: true 
         :linenos: 
         
         # Create your search index model, then create the search index
         search_index_model = SearchIndexModel(
            definition={
               "mappings": {
                     "dynamic": False,
                     "fields": {
                        "plot": {
                           "type": "string"
                        }
                     }
               }
            },
            name="search_index"
         )
         collection.create_search_index(model=search_index_model)