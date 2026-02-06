db.movies.update(
   { title: "The Godfather" },
   [
      { $set: { 
            displayTitle: { $concat: [ "$title", " (", { $toString: "$year" }, ")" ] },
            lastModified: "$$NOW" 
         } 
      }
   ]
)