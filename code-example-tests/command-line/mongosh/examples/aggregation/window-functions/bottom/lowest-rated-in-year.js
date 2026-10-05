// :snippet-start: lowest-rated-in-year
db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1980, 1981, 1982 ] },
         "imdb.rating": { $exists: true, $ne: null },
         genres: "Family",
         rated: "PG"
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         output: {
            lowestRatedInYear: {
               $bottom: {
                  output: { title: "$title", rating: "$imdb.rating" },
                  sortBy: { "imdb.rating": -1 }
               },
               window: {
                  documents: [ "unbounded", "unbounded" ]
               }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         rating: "$imdb.rating",
         lowestRatedInYear: 1,
         ratingAboveWorst: {
            $subtract: [ "$imdb.rating", "$lowestRatedInYear.rating" ]
         }
      }
   },
   {
      $limit: 10
   }
] )
// :snippet-end:
