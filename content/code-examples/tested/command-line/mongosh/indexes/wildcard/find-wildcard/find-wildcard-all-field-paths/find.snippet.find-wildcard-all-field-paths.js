db.movies.find( { "imdb.rating": { $gt: 7 } }, { title: 1 } )
