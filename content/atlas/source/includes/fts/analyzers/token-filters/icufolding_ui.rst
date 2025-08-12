.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``diacriticFolder``
      .. |fts-tokenizer| replace:: :guilabel:`keyword`
      .. |fts-token-filter| replace:: :guilabel:`icuFolding`
      .. |minutes-collection-field| replace:: **text.sv_FI** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-icufolding-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "analyzer": "diacriticFolder",
           "mappings": {
             "fields": {
               "text": {
                 "type": "document",
                 "fields": {
                   "sv_FI": {
                     "analyzer": "diacriticFolder",
                     "type": "string"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "diacriticFolder",
               "charFilters": [],
               "tokenizer": {
                 "type": "keyword"
               },
               "tokenFilters": [
                 {
                   "type": "icuFolding"
                 }
               ]
             }
           ]
         }
