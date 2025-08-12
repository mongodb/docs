.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``dashDotSpaceSplitter``
      .. |fts-tokenizer| replace:: :guilabel:`regexSplit`
      .. |minutes-collection-field| replace:: **page_updated_by.phone**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-regexsplit-config.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      Replace the default index definition with the following:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "dynamic": true,
             "fields": {
               "page_updated_by": {
                 "fields": {
                   "phone": {
                     "analyzer": "dashDotSpaceSplitter",
                     "type": "string"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [],
               "name": "dashDotSpaceSplitter",
               "tokenFilters": [],
               "tokenizer": {
                 "pattern": "[-. ]+",
                 "type": "regexSplit"
               }
             }
           ]
         }