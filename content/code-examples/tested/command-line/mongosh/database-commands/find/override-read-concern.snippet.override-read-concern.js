db.runCommand(
   {
      find: "movies",
      filter: { "imdb.rating": { $lt: 5 } },
      limit: 5,
      readConcern: { level: "majority" }
   }
)
