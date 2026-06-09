Create the |fts| Index  
~~~~~~~~~~~~~~~~~~~~~~

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
                
             use local_school_district

         .. output:: 
            :visible: false
            :language: shell 

            switched to db local_school_district

   .. step:: Run the ``db.collection.createSearchIndex()`` method to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            db.schools.createSearchIndex(
              "embedded-documents-tutorial",
              {
                "mappings": {
                  "dynamic": true,
                  "fields": {
                    "clubs": {
                      "dynamic": true,
                      "fields": {
                        "sports": {
                          "dynamic": true,
                          "type": "embeddedDocuments"
                        }
                      },
                      "type": "document"
                    },
                    "teachers": [
                      {
                        "dynamic": true,
                        "fields": {
                          "classes": {
                            "dynamic": true,
                            "type": "embeddedDocuments"
                          }
                        },
                        "type": "embeddedDocuments"
                      },
                      {
                        "dynamic": true,
                        "fields": {
                          "classes": {
                            "dynamic": true,
                            "fields": {
                              "grade": {
                                "type": "token"
                                }
                              },
                              "type": "document"
                            }
                          },
                          "type": "document"
                        }
                      }
                    ]
                  }
                }
              }
            )

         .. output::
            :visible: false
            
            embedded-documents-tutorial
