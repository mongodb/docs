db.movies.createIndex(
    { title: 1, year: 1 },
    { name: "title_year_fr", collation: { locale: "fr", strength: 2 } }
)
