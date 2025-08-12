.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``longOnly``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`icuFolding`
      .. |fts-token-filter-b| replace:: :guilabel:`length`
      .. |minutes-collection-field| replace:: **text.sv.FI** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-length-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "fields": {
               "text": {
                 "type": "document",
                 "dynamic": true,
                 "fields": {
                   "sv_FI": {
                     "type": "string",
                     "analyzer": "longOnly"
                   }
                 }
               }
             }
           },
           "analyzers": [
             {
               "name": "longOnly",
               "charFilters": [],
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "icuFolding"
                 },
                 {
                   "type": "length",
                   "min": 20
                 }
               ]
             }
           ]
         }