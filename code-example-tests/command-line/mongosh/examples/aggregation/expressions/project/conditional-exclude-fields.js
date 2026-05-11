// :snippet-start: conditional-exclude-fields
db.movies.aggregate( [
   { $match: { title: "This Is Spinal Tap" } },
   {
      $project: {
         title: 1,
         "imdb.rating": 1,
         "imdb.id": 1,
         "imdb.votes": {
            $cond: {
               if: { $in: [ "$imdb.votes", [ null, "" ] ] },
               then: "$$REMOVE",
               else: "$imdb.votes"
            }
         }
      }
   },
   { $limit: 1 }
] )
// :snippet-end:
