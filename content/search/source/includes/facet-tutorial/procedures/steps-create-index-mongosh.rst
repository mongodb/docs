Create the |fts| Index for Facet 
--------------------------------

In this section, you will create a |fts| index on the ``genres``, 
``year``, and ``released`` fields in the ``sample_mflix.movies`` 
collection. 

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

            db.movies.createSearchIndex(
              "facet-tutorial",
                {
                  "mappings": { 
                    "dynamic": true 
                    "fields": {
                    "genres": {
                        "type": "token"
                    } 
                  }
                }
              }
            )

         .. output::
            :visible: false
            
            facet-tutorial