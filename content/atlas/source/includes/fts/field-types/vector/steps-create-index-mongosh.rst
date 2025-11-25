.. procedure::
   :style: normal
   
   .. step:: Connect to the deployment by using ``mongosh``. 
    
      In your terminal, connect to your {+service+} cloud-hosted 
      deployment or local deployment from {+mongosh+}. For detailed 
      instructions on how to connect, see 
      :mongosh:`Connect to a Deployment </connect/>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
                
             use <database> 

         .. output:: 
            :visible: false
            :language: shell 

            switched to db <database>

   .. step:: Run the ``db.collection.createSearchIndex()`` method to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            db.<collection>.createSearchIndex(
              "default",
                {
                  "mappings": { 
                    "dynamic": true|false,
                    "fields": {
                    "<field-name>": {
                      "type": "vector",
                      "numDimensions": <number-of-dimensions>,
                      "similarity": "euclidean | cosine | dotProduct",
                      "quantization": "none | scalar | binary",
                      "hnswOptions": {
                        "maxEdges": <number-of-connected-neighbors>,
                        "numEdgeCandidates": <number-of-nearest-neighbors>
                      }
                    },
                    ...
                  }
                }
              }
            )

         .. output::
            :visible: false
            
            default