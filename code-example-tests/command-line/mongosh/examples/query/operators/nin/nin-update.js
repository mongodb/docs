// :snippet-start: nin-update
db.movies.updateMany(
   { genres: { $nin: [ "Drama" ] } },
   { $set: { exclude: true } }
)
// :snippet-end:
