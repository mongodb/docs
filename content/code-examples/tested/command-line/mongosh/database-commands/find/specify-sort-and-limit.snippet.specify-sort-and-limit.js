db.runCommand(
   {
      find: "movies",
      filter: { "imdb.rating": { $gte: 9 }, genres: "Drama" },
      projection: { title: 1, "imdb.rating": 1, year: 1 },
      sort: { title: 1 },
      limit: 5
   }
)
