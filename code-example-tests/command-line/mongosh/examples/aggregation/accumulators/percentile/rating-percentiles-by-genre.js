db.movies.aggregate( [
   {
      $unwind: "$genres"
   },
   {
      $match: {
         genres: { $in: [ "Action", "Drama" ] },
         "imdb.rating": { $exists: true }
      }
   },
   {
      $group: {
         _id: "$genres",
         ratingPercentiles: {
            $percentile: {
               input: "$imdb.rating",
               p: [ 0.5, 0.9 ],
               method: "approximate"
            }
         }
      }
   },
   {
      $sort: { _id: 1 }
   }
] )
