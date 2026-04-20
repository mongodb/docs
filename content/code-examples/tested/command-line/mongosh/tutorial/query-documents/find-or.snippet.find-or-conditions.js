db.movies.find( { $or: [ { rated: "G" }, { runtime: { $lt: 90 } } ] } )
