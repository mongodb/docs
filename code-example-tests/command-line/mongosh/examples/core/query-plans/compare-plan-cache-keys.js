db.movies.find( { year: { $gt: 1990 } } ).explain().queryPlanner.planCacheKey !==
   db.movies.find( { year: { $gt: 2010 } } ).explain().queryPlanner.planCacheKey
