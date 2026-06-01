db.movies.updateOne(
   { title: "The Dark Knight" },
   { $unset: { label: "", status: "" } }
)
