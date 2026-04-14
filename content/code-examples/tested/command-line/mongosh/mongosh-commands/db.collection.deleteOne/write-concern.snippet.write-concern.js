db.movies.deleteOne(
   { title: "A Corner in Wheat" },
   { writeConcern: { w: "majority", wtimeout: 100 } }
)
