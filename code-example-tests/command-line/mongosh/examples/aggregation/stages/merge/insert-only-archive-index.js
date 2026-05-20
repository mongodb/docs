// :snippet-start: insert-only-archive-index
db.movieArchive.createIndex(
   { year: 1 }, { unique: true } )
// :snippet-end:
