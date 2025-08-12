.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``mappingAnalyzer``
      .. |fts-char-filter| replace:: :guilabel:`mapping`
      .. |fts-char-filter-options| replace:: :guilabel:`mappings`
      .. |fts-tokenizer| replace:: :guilabel:`keyword`
      .. |minutes-collection-field| replace:: **page_updated_by.phone** (:manual:`nested </core/document/#dot-notation>`) 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-char-filter-mapping-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true 
         :linenos:

         {
           "mappings": {
             "fields": {
               "page_updated_by": {
                 "fields": {
                   "phone": {
                     "analyzer": "mappingAnalyzer",
                     "type": "string"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "name": "mappingAnalyzer",
               "charFilters": [
                 {
                   "mappings": {
                     "-": "",
                     ".": "",
                     "(": "",
                     ")": "",
                     " ": ""
                   },
                   "type": "mapping"
                 }
               ],
               "tokenizer": {
                 "type": "keyword"
               }
             }
           ]
         }