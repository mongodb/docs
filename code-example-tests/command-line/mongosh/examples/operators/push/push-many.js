// :snippet-start: push-many
db.movies.updateMany(
   { "imdb.rating": { $gt: 9 } },
   { $push: { genres: "Acclaimed" } }
)
// :snippet-end:
