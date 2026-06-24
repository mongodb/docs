db.movies.find(
   { year: { $type: "int" } },
   { _id: 0, title: 1, year: 1 }
).sort( { year: -1, title: 1 } ).limit( 5 )
