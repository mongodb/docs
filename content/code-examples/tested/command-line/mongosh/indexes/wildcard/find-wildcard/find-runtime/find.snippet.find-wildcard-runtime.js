db.movies.find( { runtime: { $gt: 300 } }, { title: 1 } )
