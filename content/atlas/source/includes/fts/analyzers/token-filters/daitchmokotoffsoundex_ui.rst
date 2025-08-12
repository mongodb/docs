.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``dmsAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter| replace:: :guilabel:`daitchMokotoffSoundex`
      .. |fts-token-filter-option-name| replace:: :guilabel:`originalTokens`
      .. |minutes-collection-field| replace:: **page_updated_by.last_name**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-daitchmokotoffsoundex-config.rst

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
                    "analyzer": "dmsAnalyzer"
                  }
                }
              }
            }
          },
          "analyzers": [
            {
              "name": "dmsAnalyzer",
              "tokenizer": {
                "type": "standard"
              },
              "tokenFilters": [
                {
                  "type": "daitchMokotoffSoundex",
                  "originalTokens": "include"
                }
              ]
            }
          ]
        }
