// :snippet-start: type-query-multiple-types
(
   // :snippet-start: type-query-multiple-types-numeric
   db.movies.find(
      { "imdb.rating": { $type: [ 2, 1 ] },
        runtime: { $gt: 1000 } },
      { _id: 0, title: 1, runtime: 1, "imdb.rating": 1 }
   )
   // :snippet-end:
   ,
   // :snippet-start: type-query-multiple-types-alias
   db.movies.find(
      { "imdb.rating": { $type: [ "string", "double" ] },
        runtime: { $gt: 1000 } },
      { _id: 0, title: 1, runtime: 1, "imdb.rating": 1 }
   )
   // :snippet-end:
)
// :snippet-end:
