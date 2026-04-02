db.movies.updateMany(
   { ratings: { $gte: 100 } },
   { $set: { "ratings.$[element]" : 100 } },
   { arrayFilters: [ { "element": { $gte: 100 } } ] }
)
