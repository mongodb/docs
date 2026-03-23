db.movies.find( { rated: { $exists: true } }, { _id: 0, title: 1, rated: 1 } ).limit( 3 )
