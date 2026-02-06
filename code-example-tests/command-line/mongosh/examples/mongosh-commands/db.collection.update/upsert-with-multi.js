db.movies.update(
   { title: { $in: ["The Godfather", "The Matrix"] } },
   { $set: { test_upsert_field: true } },
   { upsert: true, multi: true }
)