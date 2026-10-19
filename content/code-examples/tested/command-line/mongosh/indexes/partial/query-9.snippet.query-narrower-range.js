db.movies.find( { year: { $gt: 2010 } } ).explain("executionStats")
