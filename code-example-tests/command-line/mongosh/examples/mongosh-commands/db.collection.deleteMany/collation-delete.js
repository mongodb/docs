// :snippet-start: delete-with-collation
db.movies.deleteMany(
   { rated: "g", year: { $lt: 1950 } },
   { collation: { locale: "en", strength: 2 } }
)
// :snippet-end:
