db.movies.update(
   { title: "Test Movie ABC123" },  // Query parameter
   [                                // Aggregation pipeline
      { $set: { 
         year: 2024, 
         type: "movie",
         rated: "NR",
         lastModified: "$$NOW" 
      } }
   ],
   { upsert: true }   // Options
)