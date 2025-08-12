.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``phoneNumberExtractor``
      .. |fts-char-filter| replace:: :guilabel:`mapping`
      .. |fts-char-filter-option| replace:: :guilabel:`mappings`
      .. |fts-tokenizer| replace:: :guilabel:`regexCaptureGroup`
      .. |minutes-collection-field| replace:: **page_updated_by.phone**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-tokenizer-regexcapturegroup-config.rst 

   .. tab:: JSON Editor 
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "mappings": {
             "dynamic": true,
             "fields": {
               "page_updated_by": {
                 "fields": {
                   "phone": {
                     "analyzer": "phoneNumberExtractor",
                     "type": "string"
                   }
                 },
                 "type": "document"
               }
             }
           },
           "analyzers": [
             {
               "charFilters": [
                 {
                   "mappings": {
                     " ": "-",
                     "(": "",
                     ")": "",
                     ".": "-"
                   },
                   "type": "mapping"
                 }
               ],
               "name": "phoneNumberExtractor",
               "tokenFilters": [],
               "tokenizer": {
                 "group": 0,
                 "pattern": "^\\b\\d{3}[-]?\\d{3}[-]?\\d{4}\\b$",
                 "type": "regexCaptureGroup"
               }
             }
           ]
         }
