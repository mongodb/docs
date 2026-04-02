// :snippet-start: read-concern-find
db.movies.find( { "imdb.rating": { $lt: 2 } } ).readConcern("majority")
// :snippet-end: