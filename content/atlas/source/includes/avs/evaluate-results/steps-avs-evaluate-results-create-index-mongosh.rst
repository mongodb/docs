.. procedure::
   :style: normal
   
   .. step:: Connect to the deployment using {+mongosh+}. 
    
      In your terminal, connect to your {+service+} cloud-hosted 
      deployment or local deployment from {+mongosh+}. For detailed 
      instructions on how to connect, see 
      :mongosh:`Connect to a Deployment </connect/>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
                
             use sample_mflix

         .. output:: 
            :visible: false
            :language: shell 

            switched to db sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()`` method to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            db.embedded_movies.createSearchIndex(
                "vector_index", 
                "vectorSearch", 
                {
                  "fields": [
                    {
                      "numDimensions": 2048,
                      "path": "plot_embedding_voyage_3_large",
                      "similarity": "dotProduct",
                      "type": "vector",
                      "quantization": "binary"
                    },
                    {
                      "path": "genres",
                      "type": "filter"
                    }
                  ]
                }
              }
            )

         .. output::
            :visible: false
            
            vector_index
