db.movies.find(
   {},
   { year: 1, title: 1, directors: 1 }
).sort( { year: -1 } ).limit(3)
