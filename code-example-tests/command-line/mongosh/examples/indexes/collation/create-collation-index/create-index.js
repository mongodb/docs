// :snippet-start: create-collation-index
db.movies.createIndex( { title: 1 }, { collation: { locale: "fr" } } )
// :snippet-end:
