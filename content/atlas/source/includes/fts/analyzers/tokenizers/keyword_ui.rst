.. tabs::

   .. tab:: Visual Editor
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``keywordExample``
      .. |fts-tokenizer| replace:: :guilabel:`keyword`
      .. |minutes-collection-field| replace:: **message**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-keyword-config.rst

   .. tab:: JSON Editor
      :tabid: json-editor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true 
         :linenos:

         {
           "mappings": {
             "dynamic": true,
             "fields": {
               "message": {
                 "analyzer": "keywordExample",
                 "type": "string"
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [],
               "name": "keywordExample",
               "tokenFilters": [],
               "tokenizer": {
                 "type": "keyword"
               }
             }
           ]
         }
