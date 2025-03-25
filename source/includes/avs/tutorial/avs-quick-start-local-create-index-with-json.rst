a. Create a file named ``vector-index.json``

#. Copy and paste the following index definition into the |json| file.

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
              "path": "plot_embedding",
              "numDimensions": 1536,
              "similarity": "dotProduct"
              }
          ]
      }

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst
    
#. Save the file, and then run the following command
   in your terminal, replacing ``<path-to-file>`` with the path to the 
   ``vector-index.json`` file that you created.

   .. code-block:: 
      :copyable: true 

      atlas deployments search indexes create --file <path-to-file>
