db.movies.update(
   { "title": "Test Movie Unique789" },
   { $set: { year: 2024, type: "movie" } },
   { upsert: true, multi: true }
)