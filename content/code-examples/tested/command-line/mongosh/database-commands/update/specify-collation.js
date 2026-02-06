db.runCommand({
  update: "movies",
  updates: [
    {
      q: { title: "the godfather" },
      u: { $set: { featured: true } },
      collation: { locale: "en", strength: 1 }
    }
  ]
})