db.movies.aggregate( [
  // First Stage
  {
    $match: {
      title: {
        $in: [
          "The Dark Knight",
          "Inception",
          "Interstellar",
          "Brave"
        ]
      }
    }
  },
  // Second Stage
  { $project: { _id: 0, title: 1, genres: 1 } },
  // Third Stage
  { $unwind: "$genres" },
  // Fourth Stage
  {
    $group: {
      _id: "$genres",
      movieCount: { $sum: 1 }
    }
  },
  // Fifth Stage
  { $sort: { movieCount: -1 } }
] )
