db.movies.update(
   { title: "The Matrix" },
   {
      $push: { genres: "Thriller" }
   }
)