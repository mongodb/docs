db.movies.updateOne(
   { title: "The Godfather" },
   {
     $set: { rated: "PG", "tomatoes.viewer.rating": 4.5 },
     $currentDate: { lastupdated: true }
   }
)
