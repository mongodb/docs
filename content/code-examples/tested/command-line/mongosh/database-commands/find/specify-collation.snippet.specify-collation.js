db.runCommand(
   {
      find: "movies",
      filter: { title: "les misérables", year: 2012 },
      sort: { title: 1 },
      collation: { locale: "fr", strength: 1 }
   }
)
