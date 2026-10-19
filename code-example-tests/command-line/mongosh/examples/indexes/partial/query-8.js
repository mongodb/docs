// :snippet-start: query-equality-condition
db.movies.find( { year: 2005 } ).explain("executionStats")
// :snippet-end: