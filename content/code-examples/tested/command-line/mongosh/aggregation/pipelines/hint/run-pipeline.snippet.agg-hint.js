db.movies.aggregate(
    [
        { $sort: { "imdb.rating": 1 } }, 
        { $match: { rated: "R", "imdb.rating": { $gte: 9.0 } } }, 
        { $sort: { year: -1 } } 
    ],
    { hint: { "imdb.rating": 1, rated: 1 } }
)
