.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``wordDelimiterGraphFlatten``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter-a| replace:: :guilabel:`wordDelimiterGraph`
      .. |fts-token-filter-b| replace:: :guilabel:`flattenGraph`
      .. |minutes-collection-field| replace:: **message**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-flattengraph-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {  
           "mappings": {
             "fields": {
               "message": {
                 "type": "string",
                 "analyzer": "wordDelimiterGraphFlatten"
               }
             }
           },
           "analyzers": [
             {
               "name": "wordDelimiterGraphFlatten",
               "charFilters": [],
               "tokenizer": {
                 "type": "whitespace"
               },
               "tokenFilters": [
                 {
                   "type": "wordDelimiterGraph",
                   "delimiterOptions" : {
                     "generateWordParts" : true,
                     "preserveOriginal" : true
                   },
                   "protectedWords": {
                     "words": [
                       "SIGN_IN"
                     ],
                     "ignoreCase": false
                   }
                 },
                 {
                   "type": "flattenGraph"
                 }
               ]
             }
           ]
         }
