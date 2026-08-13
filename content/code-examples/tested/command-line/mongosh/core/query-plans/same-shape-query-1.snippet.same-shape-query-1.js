// Query Operation 1
db.movies.explain().find( { year: { $gt: 1990 } } )
