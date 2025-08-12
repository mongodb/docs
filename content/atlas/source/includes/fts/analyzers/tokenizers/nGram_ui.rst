.. tabs::

   .. tab:: Visual Editor
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``ngramAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`nGram`
      .. |minutes-collection-field| replace:: **message**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-ngram-config.rst

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
               "title": {
                 "analyzer": "ngramExample",
                 "type": "string"
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [],
               "name": "ngramExample",
               "tokenFilters": [],
               "tokenizer": {
                 "maxGram": 6,
                 "minGram": 4,
                 "type": "nGram"
               }
             }
           ]
         }
