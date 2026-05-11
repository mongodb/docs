// :snippet-start: merge-objects
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $lookup: {
         from: "comments",
         localField: "_id",
         foreignField: "movie_id",
         as: "movie_comments"
      }
   },
   {
      $replaceRoot: {
         newRoot: {
            $mergeObjects: [
               { $arrayElemAt: [ "$movie_comments", 0 ] },
               "$$ROOT"
            ]
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         genres: 1,
         name: 1,
         email: 1,
         text: 1,
         date: 1
      }
   }
] )
// :snippet-end:
