// :snippet-start: preserve-null
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
  {
    $unwind: {
      path: "$genres",
      preserveNullAndEmptyArrays: true
    }
  }
] )
// :snippet-end:
