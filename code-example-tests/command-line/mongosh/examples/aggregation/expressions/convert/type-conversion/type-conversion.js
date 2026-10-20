// :snippet-start: type-conversion
db.movies.aggregate( [
   { $match: { title: { $in: [
      "The Danish Girl",
      "The Godfather",
      "Gertie the Dinosaur"
   ] } } },
   {
      $project: {
         _id: 0,
         title: 1,
         rating: {
            $convert: {
               input: "$imdb.rating",
               to: "double",
               onError: "Error",
               onNull: 0
            }
         },
         metacritic: {
            $convert: {
               input: "$metacritic",
               to: "int",
               onError: "Error",
               onNull: 0
            }
         }
      }
   },
   { $sort: { title: 1 } }
] )
// :snippet-end:
