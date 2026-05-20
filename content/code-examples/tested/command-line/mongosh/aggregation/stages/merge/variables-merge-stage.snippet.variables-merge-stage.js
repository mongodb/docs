db.movies.aggregate( [
   { $match: { title: "The Godfather" } },
   { $limit: 1 },
   { $project: { title: 1 } },
   { $merge: { into: "movieDetails", whenNotMatched: "insert" } }
] )

db.runCommand( {
   aggregate: db.movieDetails.getName(),
   pipeline: [ {
      $merge: {
         into: db.movieDetails.getName(),
         let : { year: "2023" },
         whenMatched: [ {
            $addFields: { "addedYear": "$$year" }
         } ]
      }
   } ],
   cursor: {}
} )

db.movieDetails.find()
