db.movieReviews.aggregate( [
   {
      $group: {
         _id: "$title",
         allRatings: { $mergeObjects: "$data" }
      }
   },
   { $sort: { _id: 1 } }
] )
