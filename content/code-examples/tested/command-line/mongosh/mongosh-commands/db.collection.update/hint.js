db.movies.update(
   { year: { $gte: 2010, $lte: 2015 } },  // Query parameter
   { $set: { decade: "2010s" } },             // Update document
   { multi: true, hint: { year: 1 } }          // Options
)