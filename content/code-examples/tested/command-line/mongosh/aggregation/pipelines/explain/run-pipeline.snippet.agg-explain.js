db.movies.explain().aggregate( 
    [
       { $match: { "imdb.rating": { $gt: 8.5 } } },
       { $group: { _id: "$year", averageRating: { $avg: "$imdb.rating" } } },
       { $sort: { averageRating: -1 } }
    ] 
)
