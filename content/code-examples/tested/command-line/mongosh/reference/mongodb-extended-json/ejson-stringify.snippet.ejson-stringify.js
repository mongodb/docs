stringified = EJSON.stringify(
   db.comments.find( {}, { _id: 1, date: 1 } ).sort( { _id: 1 } ).limit(1).next()
)
