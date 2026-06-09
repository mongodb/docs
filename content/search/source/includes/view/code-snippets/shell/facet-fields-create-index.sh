db.listings_SearchableTypes.createSearchIndex(
  "listingsSearchableTypes",
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "idString": {
          "type": "token"
        },
        "superHostString": {
          "type": "token"
        }
      }
    }
  }
)
