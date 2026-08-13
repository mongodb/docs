// Query Operation 2
db.movies.explain().find( { year: { $gt: 2010 } } )
