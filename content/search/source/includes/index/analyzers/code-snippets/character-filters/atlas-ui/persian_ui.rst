.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``persianCharacterIndex``
      .. |fts-char-filter| replace:: :guilabel:`persian`
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |minutes-collection-field| replace:: **text.fa_IR** (:ref:`nested <document-dot-notation>`)
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/index/analyzers/code-snippets/character-filters/atlas-ui/fts-character-filter-config-steps-without-options.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true 
         :linenos:

         {
           "analyzer": "lucene.standard",
           "mappings": {
             "fields": {
               "text": {
                 "dynamic": true,
                 "fields": {
                   "fa_IR": {
                     "analyzer": "persianCharacterIndex",
                     "type": "string"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "name": "persianCharacterIndex",
               "charFilters": [
                 {
                   "type": "persian"
                 }
               ],
               "tokenizer": {
                 "type": "whitespace"
               }
             }
           ]
         }