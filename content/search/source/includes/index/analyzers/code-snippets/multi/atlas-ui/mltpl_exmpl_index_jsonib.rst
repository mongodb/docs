1. Replace the default index definition with the following index definition.

   .. code-block:: json
      :copyable: true
      :emphasize-lines: 8-13
      :linenos:

      {
        "mappings": {
          "dynamic": false,
          "fields": {
            "title": {
              "type": "string",
              "analyzer": "lucene.standard",
              "multi": {
                "frenchAnalyzer": {
                  "type": "string",
                  "analyzer": "lucene.french"
                }
              }
            },
            "plot": {
              "type": "string",
              "analyzer": "lucene.standard",
              "multi": {
                "frenchAnalyzer": {
                  "type": "string",
                  "analyzer": "lucene.french"
                }
              }
            }
          }
        }
      }

#. Click :guilabel:`Next`.
#. Click :guilabel:`Create Search Index`.
