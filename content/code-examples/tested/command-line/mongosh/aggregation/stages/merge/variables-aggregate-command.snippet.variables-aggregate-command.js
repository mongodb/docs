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
         whenMatched: [ {
            $addFields: { "addedYear": "$$year" }
         } ]
      }
   } ],
   cursor: {},
   let : { year: "2023" }
} )

db.movieDetails.find()
