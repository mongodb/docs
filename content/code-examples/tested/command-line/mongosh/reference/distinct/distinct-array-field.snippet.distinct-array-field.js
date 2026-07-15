db.movies.distinct( "genres", { rated: "G", year: { $gt: 2010 } } )
