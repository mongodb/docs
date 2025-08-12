.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``titleAutocomplete``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`icuFolding`
      .. |fts-token-filter-b| replace:: :guilabel:`edgeGram`
      .. |minutes-collection-field| replace:: **title**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-edgegram-config.rst

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "analyzer": "titleAutocomplete",
           "mappings": {
             "dynamic": false,
             "fields": {
               "title": {
                 "type": "string",
                 "analyzer": "titleAutocomplete"
               }
             }
           },
           "analyzers": [
             {
               "name": "titleAutocomplete",
               "charFilters": [],
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "icuFolding"
                 },
                 {
                   "type": "edgeGram",
                   "minGram": 4,
                   "maxGram": 7
                 }
               ]
             }
           ]
         }
