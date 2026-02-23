db.runCommand({
   update: "movies",
   updates: [
      { q: { title: "The Godfather" }, u: { $set: { "cast.$[elem]" : "REDACTED" } }, arrayFilters: [ { "elem": "Al Pacino" } ], multi: false }
   ]
})