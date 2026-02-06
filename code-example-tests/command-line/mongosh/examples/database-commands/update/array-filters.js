db.runCommand( {
   update: "movies",
   updates: [
      { q: { languages: "English" }, u: { $set: { "languages.$[element]" : "EN" } }, arrayFilters: [ { "element": "English" } ], multi: true}
   ]
} )