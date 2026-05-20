// :snippet-start: variables-merge-and-aggregate
// :remove-start:
(
// :remove-end:
db.movies.aggregate( [
   { $match: { title: "The Godfather" } },
   { $limit: 1 },
   { $project: { title: 1 } },
   { $merge: { into: "movieDetails", whenNotMatched: "insert" } }
] )
// :remove-start:
,
// :remove-end:

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
   cursor: {},
   let : { year: "2019" }
} )
// :remove-start:
,
// :remove-end:

db.movieDetails.find()
// :remove-start:
)
// :remove-end:
// :snippet-end:
