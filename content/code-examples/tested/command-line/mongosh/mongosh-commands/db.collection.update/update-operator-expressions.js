db.movies.update(
   { title: "The Godfather" },
   {
      $inc: { "tomatoes.viewer.numReviews": 1 },
      $set: {
         "tomatoes.viewer.meter": 99
      }
   }
)

/* Corresponds to the following SQL statement:
*  UPDATE movies
*  SET    tomatoes_viewer_numReviews = tomatoes_viewer_numReviews + 1,
*         tomatoes_viewer_meter = 99
*  WHERE  title = "The Godfather"
*/