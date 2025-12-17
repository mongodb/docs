db.movies.aggregate( 
    [ 
        { $match: { year : 1994 } },
        { $limit: 3 }
    ], 
    { comment: "match_three_movies_from_1994" } 
)
