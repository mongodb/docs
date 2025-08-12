.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``normalizingAnalyzer``
      .. |fts-char-filter| replace:: :guilabel:`icuNormalize`
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |minutes-collection-field| replace:: **message**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-character-filter-config-steps-without-options.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true 
         :linenos:

         {
           "mappings": {
             "fields": {
               "message": {
                 "type": "string",
                 "analyzer": "normalizingAnalyzer"
               }
             }
           },
           "analyzers": [
             {
               "name": "normalizingAnalyzer",
               "charFilters": [
                 {
                   "type": "icuNormalize"
                 }
               ],
               "tokenizer": {
                 "type": "whitespace"
               },
               "tokenFilters": []
             }
           ]
         }