.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``keywordStemRemover``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter-a| replace:: :guilabel:`keywordRepeat`
      .. |fts-token-filter-c| replace:: :guilabel:`removeDuplicates`
      .. |fts-token-filter-b| replace:: :guilabel:`porterStemming`
      .. |minutes-collection-field| replace:: **title**  
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-keyword-repeat-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "dynamic": false,
             "fields": {
               "title": {
                 "analyzer": "keywordStemRemover",
                 "type": "string"
               }
             }
           },
           "analyzers": [
             {
               "name": "keywordStemRemover",
               "tokenFilters": [
                 {
                   "type": "keywordRepeat"
                 },
                 {
                   "type": "porterStemming"
                 },
                 {
                   "type": "removeDuplicates"
                 }
               ],
               "tokenizer": {
                 "type": "whitespace"
               }
             }
           ]
         }