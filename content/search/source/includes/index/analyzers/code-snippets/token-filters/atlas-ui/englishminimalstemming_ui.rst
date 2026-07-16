.. tabs::

   .. tab:: Visual Editor 
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``minimalStemmer``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`englishMinimalStemming`
      .. |minutes-collection-field| replace:: **text.en_US**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/index/analyzers/code-snippets/token-filters/atlas-ui/fts-token-filter-englishminimalstemming-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true
   
         {
           "mappings": {
             "dynamic": true,
             "fields": {
               "text": {
                 "fields": {
                   "en_US": {
                     "analyzer": "minimalStemmer",
                     "searchAnalyzer": "minimalStemmer",
                     "type": "string"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "name": "minimalStemmer",
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "type": "englishMinimalStemming"
                 }
               ],
               "tokenizer": {
                 "type": "standard"
               }
             }
           ]
         }
