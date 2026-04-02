db.movies.updateMany(
   { genres: "drama" },
   { $set: { genreNormalized: true } },
   { collation: { locale: "en", strength: 1 } }
)
