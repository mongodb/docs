.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``reverseAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter| replace:: :guilabel:`reverse`
      .. |minutes-collection-field| replace:: **title** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-reverse-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "analyzer": "keywordReverse",
           "mappings": {
             "dynamic": true
           },
           "analyzers": [
             {
               "name": "keywordReverse",
               "charFilters": [],
               "tokenizer": {
                 "type": "keyword"
               },
               "tokenFilters": [
                 {
                   "type": "reverse"
                 }
               ]
             }
           ]
         }