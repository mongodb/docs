// :snippet-start: arithmetic-operators
db.movies.aggregate( [
  {
     $match: { runtime: { $gt: 1000 } }
  },
  {
     $addFields: {
        genreScores: {
           $map: {
              input: "$genres",
              as: "genre",
              in: {
                 $add: [
                    { $multiply: [ { $strLenCP: "$$genre" }, 2 ] },
                    1
                 ]
              }
           }
        }
     }
  },
  { $project: { _id: 0, title: 1, genres: 1, genreScores: 1 } },
  { $sort: { title: 1 } }
] )
// :snippet-end:
