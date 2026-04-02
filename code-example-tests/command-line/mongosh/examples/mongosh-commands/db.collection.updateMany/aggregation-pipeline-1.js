db.movies.updateMany(
   { year: { $gte: 2010, $lte: 2019 } },
   [
      { $set: { 
         combinedRatings: [ "$imdb.rating", "$tomatoes.viewer.rating" ], 
         ratingsUpdated: "$$NOW" 
      } },
      { $unset: [ "imdb.rating", "tomatoes.viewer.rating" ] }
   ]
)
