.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      The ``doubleMetaphone`` token filter is not supported in the {+atlas-ui+} 
      :guilabel:`Visual Editor`.

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json 
        :copyable: true

        {
          "mappings": {
            "dynamic": false,
            "fields": {
              "page_updated_by": {
                "type": "document",
                "dynamic": false,
                "fields": {
                  "last_name": {
                    "type": "string",
                    "analyzer": "doubleMetaphoneAnalyzer"
                  }
                }
              }
            }
          },
          "analyzers": [
            {
              "name": "doubleMetaphoneAnalyzer",
              "tokenizer": {
                "type": "standard"
              },
              "tokenFilters": [
                {
                  "type": "doubleMetaphone",
                  "originalTokens": "include"
                }
              ]
            }
          ]
        }
