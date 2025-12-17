db.movies.aggregate(
    [ 
       { $match: { "imdb.rating": { $gte: 8.0 } } },
       { $group: { _id: "$rated", avgRating: { $avg: "$imdb.rating" }, count: { $sum: 1 } } },
       { $sort: { avgRating: -1 } }
    ],
    { readConcern: { level: "majority" } }
)
