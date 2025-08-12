.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``asciiConverter``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter| replace:: :guilabel:`asciiFolding`
      .. |minutes-collection-field| replace:: **page_updated_by.first_name**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-asciifolding-config.rst

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
                   "first_name": {
                     "type": "string",
                     "analyzer": "asciiConverter"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "asciiConverter",
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "asciiFolding"
                 }
               ]
             }
           ]
         }
