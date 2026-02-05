db.movies.createIndex(
    { title: 1 },
    { name: "title_fr", collation: { locale: "fr", strength: 2 } }
)
