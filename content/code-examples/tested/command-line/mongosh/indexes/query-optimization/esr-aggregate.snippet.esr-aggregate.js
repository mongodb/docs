db.movies.aggregate( [
   { $match: { rated: "PG",
     released: { $gt: ISODate("2000-01-01T00:00:00Z") } } },
   { $sort: { title: 1 } },
   { $limit: 5 },
   { $project: { _id: 1, "imdb.rating": 1 } }
] )
