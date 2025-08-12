.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``standardExample``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |minutes-collection-field| replace:: **message**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-standard-config.rst 

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
                "analyzer": "standardExample",
                "type": "string"
              }
            }
          },
          "analyzers": [
            {
              "charFilters": [],
              "name": "standardExample",
              "tokenFilters": [],
              "tokenizer": {
                "type": "standard"
              }
            }
          ]
         }
