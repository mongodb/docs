// :snippet-start: query-view
db.movieComments.aggregate( [
   {
      $group:
         {
            _id: "$title",
            totalComments: { $sum: "$numComments" }
         }
   },
   { $sort: { totalComments: -1 } },
   { $limit: 5 }
] )
// :snippet-end:
