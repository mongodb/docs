.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name-a| replace:: ``emailAutocompleteIndex``
      .. |analyzer-name-b| replace:: ``emailAutocompleteSearch``
      .. |fts-char-filter| replace:: :guilabel:`mapping`
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter-a| replace:: :guilabel:`shingle`
      .. |fts-token-filter-b| replace:: :guilabel:`edgeGram`
      .. |minutes-collection-field| replace:: **page_updated_by.email** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-shingle-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true
         :linenos:
         :emphasize-lines: 34-38

         {
           "analyzer": "lucene.keyword",
           "mappings": {
             "dynamic": true,
             "fields": {
               "page_updated_by": {
                 "type": "document",
                 "fields": {
                   "email": {
                     "type": "string",
                     "analyzer": "emailAutocompleteIndex",
                     "searchAnalyzer": "emailAutocompleteSearch"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "emailAutocompleteIndex",
               "charFilters": [
                 {
                   "mappings": {
                     "@": "AT"
                   },
                   "type": "mapping"
                 }
               ],
               "tokenizer": {
                 "maxTokenLength": 15,
                 "type": "whitespace"
               },
               "tokenFilters": [
                 {
                   "maxShingleSize": 3,
                    **** "minShingleSize": 2,
                   "type": "shingle"
                 },
                 {
                   "maxGram": 15,
                   "minGram": 2,
                   "type": "edgeGram"
                 }
               ]
             },
             {
               "name": "emailAutocompleteSearch",
               "charFilters": [
                 {
                   "mappings": {
                     "@": "AT"
                   },
                   "type": "mapping"
                 }
               ],
               "tokenizer": {
                 "maxTokenLength": 15,
                 "type": "whitespace"
               }
             }
           ]
         }