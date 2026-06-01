// :snippet-start: push-value
db.movies.updateOne(
   { title: "The Dark Knight" },
   { $push: { genres: "Classic" } }
)
// :snippet-end:
