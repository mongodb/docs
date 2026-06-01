db.movies.updateMany(
   { "imdb.rating": { $gt: 9 } },
   { $push: { genres: "Acclaimed" } }
)
