[
  {
    "$search": {
      "index": "listingsSearchableTypes",
      "compound": {
        "should": [
          {
            "text": {
              "path": "searchable_types.property_type",
              "query": "House"
            }
          },
          {
            "text": {
              "path": "searchable_types.room_type",
              "query": "Private room"
            }
          }
        ]
      }
    }
  }
]