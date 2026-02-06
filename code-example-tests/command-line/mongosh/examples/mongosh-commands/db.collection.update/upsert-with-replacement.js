db.movies.update(
   { title: "Test Movie 12345" },
   { 
      $set: {
         title: "Test Movie 12345", 
         year: 2024, 
         genres: [ "Documentary" ],
         rated: "NR"
      }
   },
   { upsert: true }
)