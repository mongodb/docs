db.movies.deleteOne(
   { title: "the dark knight" },
   { collation: { locale: "en", strength: 2 } }
)
