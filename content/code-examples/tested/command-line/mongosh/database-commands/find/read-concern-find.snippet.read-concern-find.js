db.movies.find( { "imdb.rating": { $lt: 2 } } ).readConcern("majority")
