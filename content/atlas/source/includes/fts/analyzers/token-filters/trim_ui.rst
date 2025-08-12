
.. tabs::

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``tokenTrimmer``
      .. |fts-char-filter| replace:: :guilabel:`htmlStrip`
      .. |fts-tokenizer| replace:: :guilabel:`keyword`
      .. |fts-token-filter| replace:: :guilabel:`trim`
      .. |minutes-collection-field| replace:: **text.en_US** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-trim-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "fields": {
               "text": {
                 "type": "document",
                 "fields": {
                   "en_US": {
                     "type": "string",
                     "analyzer": "tokenTrimmer" 
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "tokenTrimmer",
               "charFilters": [{
                 "type": "htmlStrip",
                 "ignoredTags": ["a"]
               }],
               "tokenizer": {
                 "type": "keyword"
               },
               "tokenFilters": [
                 {
                   "type": "trim"
                 }
               ]
             }
           ]
         }
