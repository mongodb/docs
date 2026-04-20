db.movies.find( {
     rated: "G",
     $or: [ { runtime: { $lt: 90 } }, { title: /^T/ } ]
} )
