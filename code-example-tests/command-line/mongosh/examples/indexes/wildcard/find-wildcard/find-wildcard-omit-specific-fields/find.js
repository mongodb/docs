// :snippet-start: find-wildcard-omit-specific-fields
db.movies.find( { "tomatoes.viewer.rating": { $gt: 3 } }, { title: 1 } )
// :snippet-end: