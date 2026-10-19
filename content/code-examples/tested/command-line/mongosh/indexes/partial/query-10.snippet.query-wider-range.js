db.movies.find( { year: { $gt: 1990 } } ).explain("executionStats")
