db.listings_SearchableTypes.createSearchIndex(
  "listingsSearchableTypes",
  {
    "analyzer": "lucene.standard",
    "searchAnalyzer": "lucene.standard",
    "mappings": {
      "dynamic": false,
      "fields": {
        "searchable_types": [
          {
            "type": "document",
            "dynamic": {
                "typeSet": "tokenTypeSet"
            }
          }
        ]
      }
    },
    "typeSets": [
      {
        "name": "tokenTypeSet",
        "types": [
          {
            "type": "token"
          }
        ]
      }
    ]
  }
)