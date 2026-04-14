// :snippet-start: collation-delete
db.movies.deleteOne(
   { title: "the dark knight" },
   { collation: { locale: "en", strength: 2 } }
)
// :snippet-end:
