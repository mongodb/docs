db.movies.updateMany(
   { genres: { $nin: [ "Drama" ] } },
   { $set: { exclude: true } }
)
