db.movies.find( 
   { year: { $gte:1960, $lte:1970 }, directors:'Martin Scorsese' }, 
   { title: 1, directors: 1, year: 1 })
