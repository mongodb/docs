Define the Index for the |fts-field-type| Type 
----------------------------------------------

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
              "definition": {
                "mappings": {
                  "dynamic": true|false {
                    "typeSet": "<typeSet-name>"
                  }
                  "fields": {
                    "<field-name>": {
                      "type": "embeddedDocuments",
                      "dynamic": true|false {
                        "typeSet": "<typeSet-name>"
                      }
                    },
                    ...
                  }
                },
                "typeSets": [
                  {
                    "name": "<typeSet-name>",
                    "types": [
                     {
                       "type": "<field-type>",
                       ...
                     },
                     ...
                    ]
                  },
                  ...
                ]
              }
            )

         .. output::
            :visible: false
            
            default
