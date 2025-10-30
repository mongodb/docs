.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``removeDuplicates``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter-a| replace:: :guilabel:`keywordRepeat`
      .. |fts-token-filter-b| replace:: :guilabel:`removeDuplicates`
      .. |minutes-collection-field| replace:: **title**  
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-remove-duplicates-config.rst 

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
                 "analyzer": "duplicateRemover",
                 "type": "string"
               }
             }
           },
           "analyzers": [
             {
               "name": "duplicateRemover",
               "tokenFilters": [
                 {
                   "type": "keywordRepeat"
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