db.movies.find( { "tomatoes.viewer.rating": { $gt: 4 } }, { title: 1 } )
