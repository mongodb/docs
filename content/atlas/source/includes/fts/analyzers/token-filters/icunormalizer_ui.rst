.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``textNormalizer``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter| replace:: :guilabel:`icuNormalizer`
      .. |minutes-collection-field| replace:: **message** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-icunormalizer-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "analyzer": "textNormalizer",
           "mappings": {
             "fields": {
               "message": {
                 "type": "string",
                 "analyzer": "textNormalizer"
               }
             }
           },
           "analyzers": [
             {
               "name": "textNormalizer",
               "charFilters": [],
               "tokenizer": {
                 "type": "whitespace"
               },
               "tokenFilters": [
                 {
                   "type": "icuNormalizer",
                   "normalizationForm": "nfkc"
                 }
               ]
             }
           ]
         }
