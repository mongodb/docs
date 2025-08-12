.. tabs::

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``wordDelimiterGraphAnalyzer``
      .. |fts-tokenizer| replace:: :guilabel:`whitespace`
      .. |fts-token-filter| replace:: :guilabel:`wordDelimiterGraph`
      .. |minutes-collection-field| replace:: **title** nested
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-worddelimitergraphanalyzer-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {  
           "mappings": {
             "fields": {
               "title": {
                 "type": "string",
                 "analyzer": "wordDelimiterGraphAnalyzer"
               }
             }
           },
           "analyzers": [
             {
               "name": "wordDelimiterGraphAnalyzer",
               "charFilters": [],
               "tokenizer": {
                 "type": "whitespace"
               },
               "tokenFilters": [
                 {
                   "type": "wordDelimiterGraph",
                   "protectedWords": {
                     "words": ["is", "the", "at"],
                     "ignoreCase": false
                   },
                   "delimiterOptions" : {
                     "generateWordParts" : false,
                     "splitOnCaseChange" : true
                   }
                 }
               ]
             }
           ]
         }
