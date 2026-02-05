// :snippet-start: create-wildcard-all-field-paths
db.movies.createIndex( { "$**": 1 } )
// :snippet-end: