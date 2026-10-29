db.movies.find( { rated: "R" } )
db.movies.find( { year: 1994 } ).sort( { title: 1 } )
db.movies.find( { metacritic: { $gt: 90 } } )
