.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``kStemmer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`kStemming`
      .. |minutes-collection-field| replace:: **text.en_US** nested 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-kstemming-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true
   
         {  
           "analyzer": "kStemmer", 
           "mappings": {
             "dynamic": true
           },
           "analyzers": [
             {
               "name": "kStemmer",
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "type": "kStemming"
                 }
               ]
             }
           ]
         }
