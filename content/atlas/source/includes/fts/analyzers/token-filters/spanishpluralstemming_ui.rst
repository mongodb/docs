.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``spanishPluralStemmer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`spanishPluralStemming`
      .. |minutes-collection-field| replace:: **text.es_MX** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-spanishpluralstemming-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {  
           "analyzer": "spanishPluralStemmer", 
           "mappings": {
             "fields": {
               "text: { 
                 "type": "document",
                 "fields": {
                   "es_MX": {
                     "analyzer": "spanishPluralStemmer",
                     "searchAnalyzer": "spanishPluralStemmer",
                     "type": "string"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "spanishPluralStemmer",
               "charFilters": [],
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "type": "spanishPluralStemming"
                 }
               ]
             }
           ]
         }