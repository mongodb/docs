db.listings_SearchableTypes.aggregate([
  {
    "$search": {
      "index": "listingsSearchableTypes",
      "compound": {
        "should": [
          {
            "equals": {
              "path": "searchable_types.property_type",
              "value": "House"
            }
          },
          {
            "equals": {
              "path": "searchable_types.room_type",
              "value": "Private room"
            }
          }
        ]
      }
    }
  },
  {
    "$limit": 10
  },
  {
    "$project": {
      "_id": 0,
      "searchable_types": 1,
      "name": 1 
    }
  }
])
