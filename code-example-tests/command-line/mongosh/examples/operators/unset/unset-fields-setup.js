db.movies.updateOne(
   { title: "The Dark Knight" },
   { $set: { label: "Award Winner", status: "classic" } }
)
