db.createView(
  "listings_SearchableTypes",
  "listingsAndReviews",
    [
      {
        "$addFields": {
          "idString": { "$toString": "$_id" },
          "superHostString": { "$toString": "$host.host_is_superhost" }
        }
      }
    ]
)