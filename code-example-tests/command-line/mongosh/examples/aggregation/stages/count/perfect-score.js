// :snippet-start: count-perfect-score
db.movies.aggregate( [
   { $match: { metacritic: { $eq: 100 } } },
   { $count: "perfect_score_count" }
] )
// :snippet-end:
