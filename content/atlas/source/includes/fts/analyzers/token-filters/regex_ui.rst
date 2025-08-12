.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``emailRedact``
      .. |fts-tokenizer| replace:: :guilabel:`keyword`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`regex`
      .. |minutes-collection-field| replace:: **page_updated_by.email** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-regex-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true
 
         {
           "analyzer": "lucene.standard",
           "mappings": {
             "dynamic": false,
             "fields": {
               "page_updated_by": {
                 "type": "document",
                 "fields": {
                   "email": {
                     "type": "string",
                     "analyzer": "emailRedact"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [],
               "name": "emailRedact",
               "tokenizer": {
                 "type": "keyword"
               },
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "matches": "all",
                   "pattern": "^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,5})$",
                   "replacement": "redacted",
                   "type": "regex"
                 }
               ]
             }
           ]
         }