// :snippet-start: window-example
db.movies.aggregate( [
   { $match: { year: { $in: [1914, 1915] } } },
   { $setWindowFields: {
        partitionBy: { year: "$year" },
        sortBy: { title: 1 },
        output: {
           combinedGenres: {
              $concatArrays: "$genres",
              window: { documents: ["unbounded", "current"] }
           }
        }
   } },
   { $project: { _id: 0, year: 1, title: 1, combinedGenres: 1 } }
] )
// :snippet-end:
