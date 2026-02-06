db.movies.update(
   { title: "The Godfather" },
   { $set: { "writers.$[elem]" : { $concat: [ "$elem", " - UPDATED" ] } } },
   {
      arrayFilters: [ { "elem": { $regex: /screenplay/ } } ]
   }
)