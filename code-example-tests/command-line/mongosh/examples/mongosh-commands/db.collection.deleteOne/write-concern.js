// :snippet-start: write-concern
db.movies.deleteOne(
   { title: "A Corner in Wheat" },
   { writeConcern: { w: "majority", wtimeout: 100 } }
)
// :snippet-end:
