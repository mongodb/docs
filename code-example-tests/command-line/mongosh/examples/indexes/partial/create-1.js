db.movies.createIndex(
   { title: 1 },
   { partialFilterExpression: { genres: "Drama" } }
)