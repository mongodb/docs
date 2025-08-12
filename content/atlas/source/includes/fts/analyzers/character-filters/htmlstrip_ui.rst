.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``htmlStrippingAnalyzer``
      .. |fts-char-filter| replace:: :guilabel:`htmlStrip`
      .. |fts-char-filter-option-name| replace:: :guilabel:`ignoredTags`
      .. |fts-char-filter-option-value| replace:: ``a``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |minutes-collection-field| replace:: **text.en_US** nested 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-char-filter-htmlstrip-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true 
         :linenos:

          {
            "mappings": {
              "fields": {
                "text": {
                  "type": "document",
                  "dynamic": true,
                  "fields": {
                    "en_US": {
                      "analyzer": "htmlStrippingAnalyzer",
                      "type": "string"
                    }
                  }
                }
              }
            },
            "analyzers": [{
              "name": "htmlStrippingAnalyzer",
              "charFilters": [{
                "type": "htmlStrip",
                "ignoredTags": ["a"]
              }],
              "tokenizer": {
                "type": "standard"
              },
              "tokenFilters": []
            }]
          }