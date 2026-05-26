db.movies.aggregate( [
  { $match: { title: "Inception" } },
  { $project: { _id: 0, title: 1, genres: 1 } },
  {
    $unwind: {
      path: "$genres",
      includeArrayIndex: "genreIndex"
    }
  }
] )
