// :snippet-start: create-wildcard-index
db.movies.createIndex( { "awards.$**": 1 } )
// :snippet-end: