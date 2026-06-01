// :snippet-start: covered-query
db.movies.find(
   { rated: "PG", title: /^T/ },
   { title: 1, _id: 0 }
).limit(3)
// :snippet-end:
