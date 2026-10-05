db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.votes": { $type: "int" }
      }
   },
   {
      $group: {
         _id: "$rated",
         totalVotes: { $sum: "$imdb.votes" }
      }
   },
   {
      $sort: { _id: 1 }
   }
] )
