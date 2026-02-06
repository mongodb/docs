db.movies.update(
   { $expr: { $eq: [ "$title", "$$targetTitle" ] } },
   [ { $set: { sequel: "$$sequelTitle" } } ],
   { let : { targetTitle: "The Matrix", sequelTitle: "The Matrix Reloaded" } }
)