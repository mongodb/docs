.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``porterStemmer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`porterStemming`
      .. |minutes-collection-field| replace:: **title** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-porterstemming-config.rst 

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
                 "analyzer": "porterStemmer"
               }
             }
           },
           "analyzers": [
             {
               "name": "porterStemmer",
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "type": "porterStemming"
                 }
               ]
             }
           ]
         }
