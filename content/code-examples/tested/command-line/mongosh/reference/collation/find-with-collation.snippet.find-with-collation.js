db.movies.find(
   { title: "les miserables", year: { $gte: 1970, $lte: 2000 } },
   { title: 1, year: 1, _id: 0 }
).sort( { year: 1 } ).collation( { locale: "fr", strength: 1 } )
