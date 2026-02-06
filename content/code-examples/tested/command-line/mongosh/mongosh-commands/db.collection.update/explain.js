db.movies.explain().update(
   { title: "The Godfather", year: { $gte: 1970 } },
   { $set: { test_hint_field: true } },
   { hint: { year: 1 } }
)