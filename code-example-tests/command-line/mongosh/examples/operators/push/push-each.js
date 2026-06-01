// :snippet-start: push-each
db.movies.updateOne(
   { title: "The Dark Knight" },
   { $push: { genres: { $each: [ "Modern Classic", "Award-Winning" ] } } }
)
// :snippet-end:
