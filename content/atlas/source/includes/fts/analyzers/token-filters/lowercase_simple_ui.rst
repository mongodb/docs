.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``keywordLowerer``
      .. |fts-tokenizer| replace:: :guilabel:`keyword`
      .. |fts-token-filter| replace:: :guilabel:`lowercase`
      .. |minutes-collection-field| replace:: **title** 
      .. |fts-field-type| replace:: **Autocomplete**
      .. |fts-autocomplete-tokenization| replace:: **nGram**

      .. include:: /includes/fts/extracts/fts-token-filter-lowercase-config-simple.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
          :copyable: true

          {
            "mappings": {
              "fields": {
                "title": {
                  "analyzer": "keywordLowerer",
                  "tokenization": "nGram",
                  "type": "autocomplete"
                }
              }
            },
            "analyzers": [
              {
                "name": "keywordLowerer",
                "charFilters": [],
                "tokenizer": {
                  "type": "keyword"
                },
                "tokenFilters": [
                  {
                    "type": "lowercase"
                  }
                ]
              }
            ]
          }