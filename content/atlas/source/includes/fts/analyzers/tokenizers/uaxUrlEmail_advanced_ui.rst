.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``emailAddressAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`uaxUrlEmail`
      .. |minutes-collection-field| replace:: **page_updated_by.email**
      .. |fts-field-type| replace:: **Autocomplete**

      .. include:: /includes/fts/extracts/fts-tokenizer-uaxurlemail-config-advanced-eg.rst 

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
                     "analyzer": "emailAddressAnalyzer",
                     "tokenization": "edgeGram",
                     "type": "autocomplete"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "name": "emailAddressAnalyzer",
               "tokenizer": {
                 "type": "uaxUrlEmail"
               }
             }
           ]
         }