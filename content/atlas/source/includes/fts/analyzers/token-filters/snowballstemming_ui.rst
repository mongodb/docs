.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``frenchStemmer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`snowballStemming`
      .. |minutes-collection-field| replace:: **text.fr_CA** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-snowballstemming-config.rst 

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
                   "fr_CA": {
                     "type": "string",
                     "analyzer": "frenchStemmer"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "frenchStemmer",
               "charFilters": [],
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "type": "snowballStemming",
                   "stemmerName": "french"
                 }
               ]
             }
           ]
         }