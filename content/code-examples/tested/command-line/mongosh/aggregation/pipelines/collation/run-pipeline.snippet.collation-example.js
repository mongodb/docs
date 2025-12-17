db.movies.aggregate(
    [ 
       { $match: {"countries": "France", "languages": "French"} }, 
       { $project: { "title": 1, "_id": 0 } }
    ],
    { collation: { locale: "fr", strength: 1 } }
)
