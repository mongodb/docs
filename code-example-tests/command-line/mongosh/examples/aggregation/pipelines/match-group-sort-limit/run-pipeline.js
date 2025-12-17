// :snippet-start: match-group-sort-limit
db.movies.aggregate(
    [
       { $match: { "imdb.rating": { $gt: 8.5 } } },
       { $group: { _id: "$year", averageRating: { $avg: "$imdb.rating" } } },
       { $sort: { averageRating: -1 } },
       { $limit: 3 }
    ] 
)
// :snippet-end: