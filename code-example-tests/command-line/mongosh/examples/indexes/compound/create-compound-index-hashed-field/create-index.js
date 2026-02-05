// :snippet-start: create-compound-index-hashed-field 
db.movies.createIndex( { title: 1, runtime: "hashed" } )
// :snippet-end: