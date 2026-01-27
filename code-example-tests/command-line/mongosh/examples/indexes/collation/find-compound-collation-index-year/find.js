// :snippet-start: find-compound-collation-index-year
db.movies.find( 
    { year: 2012 }, 
    { title: 1, year: 1, metacritic: 1 } 
).sort( { title: 1 } )
// :snippet-end:
