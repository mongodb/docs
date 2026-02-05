db.movies.find( { "tomatoes.viewer.rating": { $gt: 3 } }, { title: 1 } )
