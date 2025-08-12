.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      .. |analyzer-name| replace:: ``lowerCaser``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`icuNormalizer`
      .. |fts-token-filter-b| replace:: :guilabel:`lowercase`
      .. |minutes-collection-field| replace:: **message** 
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/fts/extracts/fts-token-filter-lowercase-config-advanced.rst 

   .. tab:: JSON Editor 
      :tabid: jsoneditor

      .. code-block:: json
         :copyable: true

         {
            "mappings": {
            "fields": {
                "message": {
                "type": "string",
                "analyzer": "lowerCaser"
                }
            }
            },
            "analyzers": [
            {
                "name": "lowerCaser",
                "charFilters": [],
                "tokenizer": {
                "type": "standard"
                },
                "tokenFilters": [
                {
                    "type": "icuNormalizer",
                    "normalizationForm": "nfkd"
                },
                {
                    "type": "lowercase"
                }
                ]
            }
            ]
         }