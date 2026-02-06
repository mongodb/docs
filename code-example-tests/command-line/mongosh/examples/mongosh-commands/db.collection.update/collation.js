db.movies.update(
   { title: /^night/i },
   { $set: { updated: true } },
   {
      collation: { locale: "en", strength: 1 },
      multi: true
   }
)