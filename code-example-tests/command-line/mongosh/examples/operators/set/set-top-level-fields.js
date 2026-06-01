// :snippet-start: set-top-level-fields
db.movies.updateOne(
   { title: "The Dark Knight" },
   {
      $set: {
         label: "Award Winner",
         status: "classic"
      }
   }
)
// :snippet-end:
