db.listingsAndReviews.aggregate( [
  {
    $project: {
      lastScrapedDate: { $dateToString: { format: "%Y-%m-%d", date: "$last_scraped" } },
      accommodatesNumber: { $toString: "$accommodates" },
      maximumNumberOfNights: { $toString: "$maximum_nights" },
      propertyName: "$name",
      propertyType: "$property_type"
    }
  },
  { $merge: { into: "airbnb_mat_view", whenMatched: "replace" } }
] )