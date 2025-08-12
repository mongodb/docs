.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``stempelAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter| replace:: :guilabel:`stempel`
      .. |minutes-collection-field| replace:: **title** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-stempel-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "fields": {
               "title": {
                 "type": "string",
                 "analyzer": "stempelAnalyzer"
               }
             }
           },
           "analyzers": [
             {
               "name": "stempelAnalyzer",
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "stempel"
                 }
               ]
             }
           ]
         }
