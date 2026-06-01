// :snippet-start: define-update-function
updateMovieStats = function(startYear) {
   db.movies.aggregate( [
      { $match: { year: { $gte: startYear } } },
      { $group: {
           _id: "$year",
           movieCount: { $sum: 1 },
           avgRating: { $avg: "$imdb.rating" }
      } },
      { $merge: { into: "movieYearStats", whenMatched: "replace" } }
   ] );
};
// :snippet-end:
