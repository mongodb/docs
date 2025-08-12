.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``edgegramExample``
      .. |fts-tokenizer| replace:: :guilabel:`edgeGram`
      .. |minutes-collection-field| replace:: **message**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-edgegram-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "dynamic": true,
             "fields": {
               "message": {
                 "analyzer": "edgegramExample",
                 "type": "string"
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [],
               "name": "edgegramExample",
               "tokenFilters": [],
               "tokenizer": {
                 "maxGram": 7,
                 "minGram": 2,
                 "type": "edgeGram"
               }
             }
           ]
         }