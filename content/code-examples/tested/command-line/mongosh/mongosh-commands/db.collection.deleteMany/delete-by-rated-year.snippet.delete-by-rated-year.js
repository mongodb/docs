db.movies.deleteMany( { "rated": "G", "year": { $lt: 1950 } } )
