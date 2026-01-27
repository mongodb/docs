db.movies.find( { year: 2012, runtime: { $gt: Decimal128( "120" ) } }, { title: 1 } )
