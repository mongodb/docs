.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``whitespaceExample``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |minutes-collection-field| replace:: **message** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-whitespace-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "dynamic": true,
             "fields": {
               "message": {
                 "analyzer": "whitespaceExample",
                 "type": "string"
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [],
               "name": "whitespaceExample",
               "tokenFilters": [],
               "tokenizer": {
                 "type": "whitespace"
               }
             }
           ]
         }
