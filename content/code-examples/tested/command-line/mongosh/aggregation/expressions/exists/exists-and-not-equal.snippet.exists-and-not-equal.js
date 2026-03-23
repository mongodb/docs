db.movies.find( { rated: { $exists: true, $nin: [ "R", "PG-13" ] } } ).limit(5)
