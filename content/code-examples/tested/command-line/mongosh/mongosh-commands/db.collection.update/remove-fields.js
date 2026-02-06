db.movies.update( 
   { title: "The Godfather" }, 
   { $unset: { metacritic: "" } } 
)

/* $unset is similar (but not identical) to the following SQL
   command which removes the ``metacritic`` field from the ``movies``
   table

*  UPDATE movies
*  SET    metacritic = NULL
*  WHERE  title = "The Godfather"
*/