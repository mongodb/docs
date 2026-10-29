// :snippet-start: specified-documents
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   { $project: { title: 1, year: 1, _id: 0 } },
   {
      $unionWith: {
         pipeline: [
            {
               $documents: [
                  { title: "Movie A", year: 2000 },
                  { title: "Movie B", year: 2001 }
               ]
            }
         ]
      }
   }
] )
// :snippet-end:
