db.movies.update(
   { title: { $in: ["The Godfather", "The Matrix"] } },
   { $set: { test_field: true } },
   { multi: true }
)

/* Corresponds to the following SQL statement:
*  UPDATE movies
*  SET test_field = true
*  WHERE title IN ('The Godfather', 'The Matrix')
*/