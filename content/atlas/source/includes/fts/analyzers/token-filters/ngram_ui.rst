.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``titleAutocomplete``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`englishPossessive`
      .. |fts-token-filter-b| replace:: :guilabel:`nGram`
      .. |minutes-collection-field| replace:: **title** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-ngram-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
          "mappings": {
             "fields": {
               "title": {
                 "type": "string",
                 "analyzer": "titleAutocomplete",
                 "searchAnalyzer": "lucene.keyword"
               }
             }
           },
           "analyzers": [
             {
               "name": "titleAutocomplete",
               "charFilters": [],
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "englishPossessive"
                 },
                 {
                   "type": "nGram",
                   "minGram": 4,
                   "maxGram": 7
                 }
               ]
             }
           ]
         }