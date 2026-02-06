db.movies.update(
   { languages: "English" },
   { $set: { "languages.$[element]" : "EN" } },
   {
      arrayFilters: [ { "element": "English" } ],
      multi: true
   }
)