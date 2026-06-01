// :snippet-start: unset-fields
db.movies.updateOne(
   { title: "The Dark Knight" },
   { $unset: { label: "", status: "" } }
)
// :snippet-end:
