.. procedure:: 
   :style: normal

   .. step:: Create a file named ``vector-index.json``

   .. step:: Copy and paste the following index definition into the |json| file and then save the file.

      .. code-block:: 
         :copyable: true 

         {
            "database": "sample_mflix",
            "collectionName": "embedded_movies",
            "type": "vectorSearch",
            "name": "vector_index",
            "fields": [
               {
               "type": "vector",
               "path": "plot_embedding_voyage_3_large",
               "numDimensions": 2048,
               "similarity": "dotProduct"
               }
            ]
         }

      .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst
    
   .. step:: Create the index.
      
      To create the index, run the following command in your terminal, replacing 
      ``<path-to-file>`` with the path to the ``vector-index.json`` file that you 
      created.

      .. code-block:: 
         :copyable: true 

         atlas deployments search indexes create --file <path-to-file>
