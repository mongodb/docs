// :snippet-start: let-agg-method
db.movies.aggregate(
    [
       { $match: {
          $expr: { $gt: [ "$imdb.rating", "$$minRating" ] }
       } },
       { $limit: 3 }
    ],
    { let: { minRating: 8.5 } }
)
// :snippet-end: