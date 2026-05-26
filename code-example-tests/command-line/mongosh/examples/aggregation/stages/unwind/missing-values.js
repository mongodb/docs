// :snippet-start: missing-values
db.movies.aggregate( [
  {
    $match: {
      title: {
        $in: [
          "Inception",
          "Brave",
          "La porta del cielo",
          "Neecha Nagar"
        ]
      }
    }
  },
  { $project: { _id: 0, title: 1, genres: 1 } },
  { $unwind: { path: "$genres" } }
] )
// :snippet-end:
