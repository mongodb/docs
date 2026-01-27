db.movies.find( 
    { year: 2012, metacritic: { $gt: Decimal128( "50" ) } },
    { title: 1, year: 1, metacritic: 1 }
).sort( { title: 1 } )
