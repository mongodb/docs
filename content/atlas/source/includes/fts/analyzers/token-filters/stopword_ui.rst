.. tabs::

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``stopwordRemover``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter| replace:: :guilabel:`stopword`
      .. |minutes-collection-field| replace:: **text.en_US** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-stopword-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {  
           "mappings": {
             "fields": {
               "text": {
                 "type" : "document",
                 "fields": {
                   "en_US": {
                     "type": "string",
                     "analyzer": "stopwordRemover"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "stopwordRemover",
               "charFilters": [],
               "tokenizer": {
                 "type": "whitespace"
               },
               "tokenFilters": [
                 {
                   "type": "stopword",
                   "tokens": ["is", "the", "at"]
                 }
               ]
             }
           ]
         }