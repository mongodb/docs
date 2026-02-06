db.movies.update(
   { title: "Test Movie 67890" },   // Query parameter
   {                                // Update document
      $set: { rated: "PG" },
      $setOnInsert: { year: 2024, type: "movie" }
   },
   { upsert: true }                 // Options
)