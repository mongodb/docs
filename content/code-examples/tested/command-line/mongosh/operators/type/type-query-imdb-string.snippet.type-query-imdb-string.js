(
   db.movies.find(
      { "imdb.rating": { $type: 2 }, year: 2013 },
      { _id: 0, title: 1, year: 1, "imdb.rating": 1 }
   )
   ,
   db.movies.find(
      { "imdb.rating": { $type: "string" }, year: 2013 },
      { _id: 0, title: 1, year: 1, "imdb.rating": 1 }
   )
)
