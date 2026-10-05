db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 2002, 2003, 2004 ] },
         genres: "Action",
         "imdb.votes": { $gte: 5000 },
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         output: {
            top10PctRatingForYear: {
               $percentile: {
                  input: "$imdb.rating",
                  p: [ 0.9 ],
                  method: "approximate"
               },
               window: { documents: [ "unbounded", "unbounded" ] }
            }
         }
      }
   },
   {
      $match: {
         $expr: {
            $gte: [
               "$imdb.rating",
               { $arrayElemAt: [ "$top10PctRatingForYear", 0 ] }
            ]
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         imdb_rating: "$imdb.rating",
         top10PctRatingForYear: 1
      }
   },
   {
      $sort: { year: 1, imdb_rating: -1 }
   }
] )
