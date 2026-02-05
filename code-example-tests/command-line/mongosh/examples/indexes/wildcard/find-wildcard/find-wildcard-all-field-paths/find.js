// :snippet-start: find-wildcard-all-field-paths
db.movies.find( { "imdb.rating": { $gt: 7 } }, { title: 1 } )
// :snippet-end: