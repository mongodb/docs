db.createView(
  "listings_SearchableTypes",
  "listingsAndReviews",
    [
      {
        "$set": {
          "searchable_types": {
            "$arrayToObject": {
              "$filter": {
                "input": { "$objectToArray": "$$ROOT" },
                "cond": { 
                  "$regexMatch": { 
                    "input": "$$this.k", 
                    "regex": /_type$/
                  }
                }
              }
            }
          }
        }
      }
    ]
)