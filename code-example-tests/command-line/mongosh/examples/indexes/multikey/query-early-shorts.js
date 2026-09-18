// :snippet-start: find-early-short-movies
db.movies.find(
   { genres: "Short", year: { $lt: 1910 } },
   { _id: 0, title: 1, year: 1, genres: 1 }
)
// :snippet-end:
