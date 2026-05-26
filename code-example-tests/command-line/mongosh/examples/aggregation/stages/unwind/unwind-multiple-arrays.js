// :snippet-start: unwind-multiple-arrays
db.movies.aggregate( [
  // First Stage
  {
    $match: {
      title: {
        $in: [ "Inception", "The Dark Knight", "Interstellar" ]
      }
    }
  },
  // Second Stage
  { $project: { _id: 0, title: 1, genres: 1, cast: 1 } },
  // Third Stage
  { $unwind: "$genres" },
  // Fourth Stage
  { $unwind: "$cast" },
  // Fifth Stage
  {
    $group: {
      _id: "$genres",
      castAppearances: { $sum: 1 }
    }
  }
] )
// :snippet-end:
