// :snippet-start: find-wildcard-include-specific-fields
db.movies.find( { "tomatoes.viewer.rating": { $gt: 4 } }, { title: 1 } )
// :snippet-end: