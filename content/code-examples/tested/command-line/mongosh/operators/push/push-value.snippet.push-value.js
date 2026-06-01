db.movies.updateOne(
   { title: "The Dark Knight" },
   { $push: { genres: "Classic" } }
)
