db.movies.find(
   { "imdb.rating": { $type: "double" } },
   { _id: 0, title: 1, "imdb.rating": 1 }
).sort( { "imdb.rating": 1, title: 1 } ).limit( 5 )
