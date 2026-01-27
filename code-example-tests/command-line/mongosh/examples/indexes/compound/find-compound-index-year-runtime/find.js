// :snippet-start: find-compound-index-title
db.movies.find( { year: 2012, runtime: { $gt: Decimal128( "120" ) } }, { title: 1 } )
// :snippet-end: 