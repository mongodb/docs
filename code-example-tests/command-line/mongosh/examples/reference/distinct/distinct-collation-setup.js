db.movieTitlesDemo.drop()

// :snippet-start: distinct-collation-setup
db.movieTitlesDemo.insertMany( [
   { _id: 1, title: "café", status: "A" },
   { _id: 2, title: "cafe", status: "a" },
   { _id: 3, title: "cafE", status: "a" }
] )
// :snippet-end:
