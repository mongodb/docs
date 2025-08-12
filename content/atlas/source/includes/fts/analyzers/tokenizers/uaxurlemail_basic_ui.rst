.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``basicEmailAddressAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`uaxUrlEmail`
      .. |minutes-collection-field| replace:: **page_updated_by.email**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-uaxurlemail-config-basic-eg.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "fields": {
               "page_updated_by": {
                "fields": {
                   "email": {
                     "analyzer": "basicEmailAddressAnalyzer",
                     "type": "string"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "name": "basicEmailAddressAnalyzer",
               "tokenizer": {
                 "type": "uaxUrlEmail"
               }
             }
           ]
         }