db.runCommand({
   update: "movies",
   updates: [
      { q: { cast: "Al Pacino" }, u: { $set: { "cast.$[elem]" : "REDACTED" } }, arrayFilters: [ { "elem": "Al Pacino" } ], multi: true }
   ]
})