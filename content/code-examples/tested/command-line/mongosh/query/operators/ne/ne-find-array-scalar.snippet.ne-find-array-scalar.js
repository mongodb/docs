db.movies.find(
   { genres: { $ne: "Drama" }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, genres: 1 }
)
