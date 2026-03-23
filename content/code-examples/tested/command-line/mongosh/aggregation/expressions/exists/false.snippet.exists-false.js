db.movies.find( { rated: { $exists: false } }, { _id: 0, title: 1, year: 1 } ).limit( 3 )
